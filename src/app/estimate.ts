import { Entity } from './entity';

export class Estimate implements Entity {
	id: number;
	amount: number;
	date: number;
	signed: boolean;
	clientId: number;

	constructor(id?: number) {
		this.id = id;
	}
}
