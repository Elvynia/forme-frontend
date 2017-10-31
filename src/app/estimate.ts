import { Entity } from './entity';

export class Estimate implements Entity {
	id: number;
	amount: number;
	date: Date;
	signed: boolean;
	clientId: number;

	constructor(id?: number) {
		this.id = id;
		this.date = new Date();
	}
}
