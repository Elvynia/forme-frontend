import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityService, AuthService } from './core';
import { Role } from './role';

@Injectable()
export class RoleService extends EntityService<Role> {

	constructor(httpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = httpClient;
		this.authService = authService;
		this.apiPath += '/account/role';
		this.initialize();
	}

	getNew(): Role {
		return new Role();
	}

}
