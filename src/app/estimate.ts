import * as moment from 'moment';

import { Entity } from './entity';
import { Company } from './company';

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

	public clone(mission: Estimate): Estimate {
		let clone: Estimate = new Estimate();
		clone.id = mission.id;
		clone.amount = mission.amount;
		clone.date = mission.date;
		clone.signed = mission.signed;
		clone.client = mission.client;
		return clone;
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
