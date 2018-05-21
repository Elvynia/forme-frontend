import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityService, AuthService } from './core';
import { Estimate } from './estimate';

@Injectable()
export class EstimateService extends EntityService<Estimate> {

	protected initialize() {
		this.apiPath += '/estimate';
		super.initialize();
	}

	getNew(): Estimate {
		return new Estimate();
	}

}
