import { Entity } from '../core';
import { Company } from '../company/company';

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

	constructor() {
		this.prefixLabel();
	}

	public clone(invoice: any): Invoice {
		this.id = invoice.id;
		this.creationDate = invoice.creationDate;
		this.receptionDate = invoice.receptionDate;
		this.amount = invoice.amount;
		this.client = invoice.client;
		this.pending = invoice.pending;
		this.received = invoice.received;
		this.travelCosts = invoice.travelCosts;
		this.label = invoice.label;
		return this;
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
		if (time) {
			this.mdCreation = moment(time);
		}
	}

	public get receptionDate() {
		return this.received && this.mdReception ? this.mdReception.valueOf() : undefined;
	}

	public set receptionDate(time: number) {
		if (time) {
			this.mdReception = moment(time);
		}
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
