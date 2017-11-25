import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { Role } from './role';

@Injectable()
export class RoleService extends BaseService<Role> {

	constructor(httpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = httpClient;
		this.authService = authService;
		this.apiPath += '/account/role';
		this.initialize();
	}

}
