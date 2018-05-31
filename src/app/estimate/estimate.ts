import * as moment from 'moment';

import { Entity } from '../core';
import { Company } from '../company/company';

export class Estimate implements Entity {
	id: number;
	amount: number;
	mdCreation: moment.Moment;
	signed: boolean;
	client: Company;

	constructor(id?: number) {
		this.id = id;
		this.mdCreation = moment();
	}

	public clone(estimate: Estimate): Estimate {
		this.id = estimate.id;
		this.amount = estimate.amount;
		this.date = estimate.date;
		this.signed = estimate.signed;
		this.client = estimate.client;
		return this;
	}

	public getClassName(): string {
		return "Estimate";
	}

	public get date() {
		return this.mdCreation ? this.mdCreation.valueOf() : undefined;
	}

	public set date(time: number) {
		this.mdCreation = moment(time);
	}

	toJSON() {
		let json = {
			amount: this.amount,
			date: this.date,
			signed: this.signed,
			client: this.client
		};
		if (this.id) {
			json["id"] = this.id;
		}
		return json;
	}
}
