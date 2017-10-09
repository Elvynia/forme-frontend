import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice } from './invoice';
import { BaseService } from './base.service';

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
	
	constructor(HttpClient: HttpClient) {
		super();
		this.httpClient = HttpClient;
		this.apiPath += '/invoice';
	}
}