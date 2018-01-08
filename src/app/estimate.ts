import * as moment from 'moment';

import { Entity } from './entity';
import { Company } from './company';

export class Estimate implements Entity {
	id: number;
	amount: number;
	mdCreation: moment.Moment;
	signed: boolean;
	client: Company;

	static build(obj) {
		let instance: Estimate = new Estimate();
		instance.id = obj.id;
		instance.amount = obj.amount;
		instance.date = obj.date;
		instance.signed = obj.signed;
		instance.client = obj.client;
		return instance;
	}

	constructor(id?: number) {
		this.id = id;
		this.mdCreation = moment();
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
