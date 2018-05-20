import { Entity } from './entity';

import { Company } from './company';

export class Mission implements Entity {
	id: number;
	duration: number;
	client: Company;
	tjm: number;
	label: string;
	title: string;
	place: string;
	travelCosts: boolean;
	type: number;
	closed: boolean;

	constructor(id?: number) {
		this.id = id;
	}

	public clone(mission: Mission): Mission {
		// TODO implements.
		return null;
	}
}
