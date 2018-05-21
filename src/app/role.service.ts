import { Injectable } from '@angular/core';

import { Mission } from './mission';
import { EntityService } from './core';

@Injectable()
export class MissionService extends EntityService<Mission> {

  getNew(): Mission {
	  return new Mission();
  }

  protected initialize() {
	this.apiPath += '/mission';
	super.initialize();
  }

}

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
