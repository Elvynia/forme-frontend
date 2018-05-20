import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityService } from './core/entity.service';
import { AuthService } from './core/auth.service';
import { Estimate } from './estimate';

@Injectable()
export class EstimateService extends EntityService<Estimate> {

	constructor(HttpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = HttpClient;
		this.authService = authService;
		this.apiPath += '/estimate';
		this.initialize();
	}

	getNew(): Estimate {
		return new Estimate();
	}

}
