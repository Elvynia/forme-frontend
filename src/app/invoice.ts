import { Entity } from './entity';

export class Invoice implements Entity {
	id: number;
	amount: number;
	clientId: number;
	creationDate: number;
	pending: boolean;
	received: boolean;
	receptionDate: number;
	travelCosts: boolean;

	constructor(id?: number) {
		this.id = id;
	}
}
