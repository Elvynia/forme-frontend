import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from './account';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable()
export class AccountService extends BaseService<Account> {

	constructor(httpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = httpClient;
		this.authService = authService;
		this.apiPath += '/account';
		this.initialize();
	}

}
