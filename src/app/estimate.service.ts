import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { Estimate } from './estimate';

@Injectable()
export class EstimateService extends BaseService<Estimate> {

	constructor(HttpClient: HttpClient) {
		super();
		this.httpClient = HttpClient;
		this.apiPath += '/estimate';
	}

}
