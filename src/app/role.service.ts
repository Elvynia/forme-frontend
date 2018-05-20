import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './core/auth.service';
import { EntityService } from './core/entity.service';
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
