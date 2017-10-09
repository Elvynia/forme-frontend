import { Entity } from './entity';

export class Mission implements Entity {
	id: number;
	duration: number;
	clientId: number;
	tjm: number;
	label: string;
	title: string;
	place: string;
	travelCosts: boolean;
	type: number;

	constructor(id?: number) {
		this.id = id;
	}
}
