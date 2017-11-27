import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Account } from '../account';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	account: Account;

	public get isAdmin(): boolean {
		return this.account && this.account.role.name === 'ADMIN';
	}

	public get isClient(): boolean {
		return this.isAdmin || this.account && this.account.role.name === 'CLIENT';
	}

	constructor(private authService: AuthService) {
		if (this.authService.check()) {
			this.authService.accounts.first((account: Account) => !!account)
				.subscribe((account: Account) => this.account = account);
		} else {
			this.account = null;
		}
	}

	ngOnInit() {
		this.authService.accounts.subscribe((account: any) => {
			this.account = account;
		});
	}

}
