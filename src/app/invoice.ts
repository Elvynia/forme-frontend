import { Entity } from './entity';

export class Invoice implements Entity {
	id: number;
	amount: number;
	private client: any;
	creationDate: number;
	pending: boolean;
	received: boolean;
	receptionDate: number;
	travelCosts: boolean;

	constructor(id?: number) {
		this.id = id;
		this.client = {
			id: null
		};
	}

	public get clientId(): number {
		return this.client && this.client.id;
	}

	public set clientId(id: number) {
		this.client.id = id;
	}
}
