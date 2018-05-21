import { Injectable } from '@angular/core';

import { Mission } from './mission';
import { EntityService } from './core';

@Injectable()
export class MissionService extends EntityService<Mission> {
	
	protected initialize() {
		this.apiPath += '/mission';
		super.initialize();
	}

	getNew(): Mission {
		return new Mission();
	}

}
