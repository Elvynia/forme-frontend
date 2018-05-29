import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityService, AuthService, CELL_DATE_FORMAT } from '../core';
import { Estimate } from './estimate';
import { Company } from '../company/company';

import * as moment from 'moment';

@Injectable()
export class EstimateService extends EntityService<Estimate> {

	protected initialize() {
		this.apiPath += '/estimate';
		super.initialize();
	}

	getNew(): Estimate {
		return new Estimate();
	}

	exportData(data: Array<Estimate>): Array<any> {
		return data.map((e) => <any>{
			id: e.id,
			client: e.client.name,
			amount: e.amount,
			date: e.mdCreation.format(CELL_DATE_FORMAT),
			signed: e.signed
		});
	}
	
	importData(data: Array<any>) {
		let estimates = data.map(obj => {
			let estimate = new Estimate();
			estimate.amount = obj.amount;
			estimate.client = new Company();
			estimate.client.id = obj.clientId;
			estimate.mdCreation = moment(obj.date, CELL_DATE_FORMAT);
			estimate.signed = obj.signed;
			return estimate;
		});
		super.importData(estimates);
	}

}
