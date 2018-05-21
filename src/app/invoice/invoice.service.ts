import { Injectable } from '@angular/core';

import { Invoice } from './invoice';
import { EntityService } from '../core';

@Injectable()
export class InvoiceService extends EntityService<Invoice> {

	protected initialize() {
		this.apiPath += '/invoice';
		super.initialize();
	}

	getNew(): Invoice {
		return new Invoice();
	}
}