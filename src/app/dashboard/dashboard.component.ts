import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';
import { Account } from '../account';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	account: Account;

	constructor(private authService: AuthService) {
		if (this.authService.check()) {
			this.authService.accounts.first((account: Account) => !!account)
				.subscribe((account: Account) => this.account = account.clone(account));
		} else {
			this.account = null;
		}
	}

	ngOnInit() {
		this.authService.accounts.subscribe((account: any) => {
			this.account = account ? account.clone(account) : null;
		});
	}

}
