import { Entity } from './entity';
import { Company } from './company';

import * as moment from 'moment';

export class Invoice implements Entity {
	id: number;
	amount: number;
	client: Company;
	creationDate: Date;
	pending: boolean;
	received: boolean;
	receptionDate: Date;
	_travelCosts: boolean;
	label: string;

	static build(obj: any): Invoice {
		let instance: Invoice = new Invoice(obj.id);
		if (obj) {
			instance.creationDate = obj.creationDate;
			instance.receptionDate = obj.receptionDate || new Date();
			instance.amount = obj.amount;
			instance.client = obj.client;
			instance.pending = obj.pending;
			instance.received = obj.received;
			instance.travelCosts = obj.travelCosts;
			instance.label = obj.label;
		}
		return instance;
	}

	public get travelCosts() {
		return this._travelCosts;
	}

	public set travelCosts(val: boolean) {
		this._travelCosts = val;
		this.prefixLabel();
	}

	constructor(id?: number) {
		this.id = id;
		this.creationDate = new Date();
		this.receptionDate = new Date();
		this.prefixLabel();
	}

	prefixLabel() {
		this.label = this.travelCosts ? 'Frais' : 'Facture';
		this.label += '-';
		this.label += moment().year();
		this.label += '-';
	}
}
