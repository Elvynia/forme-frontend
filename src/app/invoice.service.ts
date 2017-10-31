import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice } from './invoice';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
	
	constructor(httpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = httpClient;
		this.authService = authService
		this.apiPath += '/invoice';
		this.initialize();
	}
}