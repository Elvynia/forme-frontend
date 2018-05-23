import { Injectable } from '@angular/core';

import { Invoice } from './invoice';
import { EntityService } from '../core';
import { CELL_DEFAULT_VALUE, CELL_DATE_FORMAT } from '../core/constants';
import { Company } from '../company/company';

import * as moment from 'moment';

@Injectable()
export class InvoiceService extends EntityService<Invoice> {

	protected initialize() {
		this.apiPath += '/invoice';
		super.initialize();
	}

	getNew(): Invoice {
		return new Invoice();
	}

	exportData(data: Array<Invoice>): Array<any> {
		return data.map((invoice) => <any>{
			id: invoice.id,
			client: invoice.client ? invoice.client.name : CELL_DEFAULT_VALUE,
			label: invoice.label,
			amount: invoice.amount,
			creationDate: invoice.mdCreation.format(CELL_DATE_FORMAT),
			pending: invoice.pending || false,
			received: invoice.received || false,
			receptionDate: invoice.mdReception ? invoice.mdReception.format(CELL_DATE_FORMAT) : CELL_DEFAULT_VALUE,
			travelCosts: invoice.travelCosts || false
		});
	}

	importData(data: Array<any>) {
		let parsedData = data.map((obj: any) => {
			let invoice: Invoice = new Invoice();
			// FIXME: handle update : invoice.id = obj.id;
			invoice.label = obj.label;
			invoice.client = new Company();
			invoice.client.id = obj.clientId;
			invoice.amount = obj.amount;
			invoice.mdCreation = moment(obj.creationDate, CELL_DATE_FORMAT);
			invoice.pending = obj.pending;
			invoice.received = obj.received;
			if (invoice.received) {
				invoice.mdReception = moment(obj.receptionDate, CELL_DATE_FORMAT);
			}
			invoice.travelCosts = obj.travelCosts;
			return invoice;
		});
		super.importData(parsedData);
	}
}