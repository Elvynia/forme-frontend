import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Account } from '../account/account';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	@Input() returnUrl: string;
	account: Account;

	constructor(private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router) {
		this.returnUrl = '/';
		this.account = new Account();
	}

	ngOnInit() {
		this.route.queryParamMap.subscribe((params) => {
			if (params.has('returnUrl')) {
				this.returnUrl = params.get('returnUrl');
			}
		});
	}

	login() {
		this.authService.login(this.account)
			.subscribe((account: Account) => {
				this.router.navigate([this.returnUrl]);
			});
	}

}
