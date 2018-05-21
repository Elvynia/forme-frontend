import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core';
import { FormeAccount } from '../forme-account';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	account: FormeAccount;

	constructor(private authService: AuthService) {
		if (this.authService.check()) {
			this.authService.accounts.first((account: FormeAccount) => !!account)
				.subscribe((account: FormeAccount) => this.account = new FormeAccount().clone(account));
		} else {
			this.account = null;
		}
	}

	ngOnInit() {
		this.authService.accounts.subscribe((account: any) => {
			this.account = account ? new FormeAccount().clone(account) : null;
		});
	}

}
