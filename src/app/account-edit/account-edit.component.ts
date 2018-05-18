import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelectionList, MatListOption } from '@angular/material';

import { Subscription } from 'rxjs/Rx';

import { Account } from '../account';
import { Role } from '../role';
import { Company } from '../company';
import { RoleService } from '../role.service';
import { CompanyService } from '../company.service';
import { AccountService } from '../account.service';

@Component({
	selector: 'account-edit',
	templateUrl: './account-edit.component.html',
	styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit, OnChanges {
	@Input() account: Account;
	@Output() onSubmit: EventEmitter<any>;
	@Input() new: boolean;
	@ViewChild('companiesSelect') companiesSelect: MatSelectionList;
	roles: Array<Role>;
	companies: Array<Company>;
	updatePassword: boolean;
	subscription: Subscription;

	constructor(private accountService: AccountService,
		private companyService: CompanyService,
		private roleService: RoleService) {
		this.new = true;
		this.account = new Account();
		this.onSubmit = new EventEmitter();
		this.updatePassword = false;
	}

	ngOnInit() {
		this.roleService.list().subscribe((roles) => this.roles = roles);
		this.companyService.list().subscribe((companies) => this.companies = companies);
		if (this.new) {
			this.subscription = this.companiesSelect.selectedOptions
						.onChange.subscribe((selection) => this.selectListener(selection));
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		console.debug('Account Edit onChanges');
		if (changes['account']) {
			console.debug('Account changed');
			if (this.subscription) {
				this.subscription.unsubscribe();
				this.subscription = null;
			}
			if (this.account && this.account.id) {
				this.new = false;
				setTimeout(() => {
					this.updateSelectedOptions();
					this.subscription = this.companiesSelect.selectedOptions
						.onChange.subscribe((selection) => this.selectListener(selection));
				}, 500);
			} else {
				this.new = true;
			}
		}
	}

	submit(form) {
		if (this.new) {
			this.accountService.create(this.account);
		} else {
			this.accountService.update(this.account);
		}
		form.resetForm(new Account());
		this.onSubmit.next();
	}

	compareRoles(role: Role, other: Role) {
		return role && other && role.id === other.id;
	}

	private selectListener(selection) {
		if (selection.added.length > 0) {
			selection.added.forEach((option: MatListOption) => {
				this.account.companies.push(option.value);
			});
		}
		if (selection.removed.length > 0) {
			selection.removed.forEach((option: MatListOption) => {
				let index = this.account.companies.findIndex((company: Company) => company.id === option.value.id);
				if (index >= 0) {
					this.account.companies.splice(index, 1);
				}
			});
		}
	}

	private updateSelectedOptions() {
		// console.debug('starting selection with %s companies', this.account.companies.length);
		if (this.companiesSelect.options) {
			this.companiesSelect.options.filter(
				(option:MatListOption) => 
					this.account.companies.findIndex((company:Company) => company.id === option.value.id) >= 0)
				.forEach((option:MatListOption) => {
					// console.debug('selecting id=%s', option.value.id);
					option.selected = true;
				});
			this.companiesSelect.options.filter(
				(option:MatListOption) => 
					this.account.companies.findIndex((company:Company) => company.id === option.value.id) < 0)
				.forEach((option:MatListOption) => {
					// console.debug('deselecting id=%s', option.value.id);
					option.selected = false;
				});
		}
	}
}
