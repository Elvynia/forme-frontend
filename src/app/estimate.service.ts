import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { AuthService } from './auth.service';
import { Estimate } from './estimate';

@Injectable()
export class EstimateService extends BaseService<Estimate> {

	constructor(HttpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = HttpClient;
		this.authService = authService;
		this.apiPath += '/estimate';
		this.initialize();
	}

}
