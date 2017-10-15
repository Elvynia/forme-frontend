import { Entity } from './entity';

import * as moment from 'moment';

export class Invoice implements Entity {
	id: number;
	amount: number;
	clientId: number;
	creationDate: string;
	pending: boolean;
	received: boolean;
	receptionDate: string;
	travelCosts: boolean;
	label: string;

	static build(obj: any): Invoice {
		let instance: Invoice = new Invoice(obj.id);
		if (instance) {
			instance.creationDate = obj.creationDate;
			instance.receptionDate = obj.receptionDate;
			instance.amount = obj.amount;
			instance.clientId = obj.clientId;
			instance.pending = obj.pending;
			instance.received = obj.received;
			instance.travelCosts = obj.travelCosts;
			instance.label = obj.label;
		}
		return instance;
	}

	public get creationDateValue() {
		if (!this.creationDate) {
			this.creationDate = moment().format();
		}
		return moment(this.creationDate).format('YYYY-MM-DD');
	}

	public get receptionDateValue() {
		if (!this.receptionDate) {
			this.receptionDate = moment().format();
		}
		return moment(this.receptionDate).format('YYYY-MM-DD');
	}

	public set creationDateValue(creationDate: any) {
		this.creationDate = creationDate;
	}

	public set receptionDateValue(receptionDate: any) {
		this.receptionDate = receptionDate;
	}

	constructor(id?: number) {
		this.id = id;
	}
}
