import { Entity } from './entity';

export class Estimate implements Entity {
	id: number;
	amount: number;
	date: number;
	private client: any;

	public get clientId(): number {
		return this.client && this.client.id;
	}

	public set clientId(id: number) {
		this.client = {
			id: id
		};
	}
}
