import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Account, Authority } from '../account';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	isAdmin: boolean;
	isClient: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.authService.loggedOut.subscribe(() => this.isAdmin = false);
		this.authService.loggedIn.subscribe((account: Account) => {
			this.isAdmin = account.authorities
				.findIndex((auth: Authority) => auth.authority === 'ADMIN') >= 0;
			this.isClient = account.authorities
				.findIndex((auth: Authority) => auth.authority === 'CLIENT') >= 0;
		});
	}

}
