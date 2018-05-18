import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from './account';
import { AuthService } from './core/auth.service';
import { EntityService } from './core/entity.service';

@Injectable()
export class AccountService extends EntityService<Account> {

	constructor(httpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = httpClient;
		this.authService = authService;
		this.apiPath += '/account';
		this.initialize();
	}

}
