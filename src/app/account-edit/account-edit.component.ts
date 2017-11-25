import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { Account } from '../account';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { AccountService } from '../account.service';

@Component({
	selector: 'app-account-edit',
	templateUrl: './account-edit.component.html',
	styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit, OnChanges {
	@Input() account: Account;
	@Output() onSubmit: EventEmitter<any>;
	@Input() new: boolean;
	roles: Array<Role>;
	updatePassword: boolean;

	constructor(private accountService: AccountService,
		private roleService: RoleService) {
		this.new = true;
		this.account = new Account();
		this.onSubmit = new EventEmitter();
		this.updatePassword = false;
	}

	ngOnInit() {
		this.roleService.list().subscribe((roles) => this.roles = roles);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['account']) {
			if (this.account && this.account.id) {
				this.new = false;
			} else {
				this.new = true;
			}
		}
	}

	submit(form) {
		if (this.new) {
			console.log('create account');
			//this.accountService.create(this.account);
		} else {
			console.log('update account');
			//this.accountService.update(this.account);
		}
		form.resetForm(new Account());
		this.onSubmit.next();
	}

	compareRoles(role: Role, other: Role) {
		return role && other && role.id === other.id;
	}

}
