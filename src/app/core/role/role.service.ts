import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { Role } from './role';

@Injectable()
export class RoleService extends EntityService<Role> {

	protected initialize() {
		this.apiPath += '/account/role';
		super.initialize();
	}

	getNew(): Role {
		return new Role();
	}

}
