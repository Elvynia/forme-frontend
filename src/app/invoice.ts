import { Entity } from './entity';
import { Company } from './company';

import * as moment from 'moment';

export class Invoice implements Entity {
	id: number;
	amount: number;
	client: Company;
	mdCreation: moment.Moment;
	pending: boolean;
	received: boolean;
	mdReception: moment.Moment;
	_travelCosts: boolean;
	label: string;

	static build(obj: any): Invoice {
		let instance: Invoice = new Invoice(obj.id);
		if (obj) {
			instance.creationDate = obj.creationDate;
			instance.receptionDate = obj.receptionDate;
			instance.amount = obj.amount;
			instance.client = obj.client;
			instance.pending = obj.pending;
			instance.received = obj.received;
			instance.travelCosts = obj.travelCosts;
			instance.label = obj.label;
		}
		return instance;
	}

	constructor(id?: number) {
		this.id = id;
		this.mdCreation = moment();
		this.mdReception = moment();
		this.prefixLabel();
	}

	prefixLabel() {
		if (!this.label) {
			this.label = this.travelCosts ? 'Frais' : 'Facture';
			this.label += '-';
			this.label += moment().year();
			this.label += '-';
		}
	}

	public get travelCosts() {
		return this._travelCosts;
	}

	public set travelCosts(val: boolean) {
		this._travelCosts = val;
		this.prefixLabel();
	}

	public get creationDate() {
		return this.mdCreation ? this.mdCreation.valueOf() : undefined;
	}

	public set creationDate(time: number) {
		this.mdCreation = moment(time);
	}

	public get receptionDate() {
		return this.received && this.mdReception ? this.mdReception.valueOf() : undefined;
	}

	public set receptionDate(time: number) {
		this.mdReception = moment(time);
	}

	toJSON() {
		let json = {
			client: this.client,
			amount: this.amount,
			creationDate: this.creationDate,
			receptionDate: this.receptionDate,
			received: this.received,
			travelCosts: this._travelCosts,
			pending: this.pending,
			label: this.label
		};
		if (this.id) {
			json["id"] = this.id;
		}
		return json;
	}
}
