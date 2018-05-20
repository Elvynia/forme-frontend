import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice } from './invoice';
import { EntityService } from './core/entity.service';
import { AuthService } from './core/auth.service';

@Injectable()
export class InvoiceService extends EntityService<Invoice> {
	
	constructor(httpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = httpClient;
		this.authService = authService
		this.apiPath += '/invoice';
		this.initialize();
	}

	getNew(): Invoice {
		return new Invoice();
	}
}