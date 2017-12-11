import { Entity } from './entity';

import { Company } from './company';

export class Estimate implements Entity {
	id: number;
	amount: number;
	date: Date;
	signed: boolean;
	client: Company;

	constructor(id?: number) {
		this.id = id;
		this.date = new Date();
	}
}
