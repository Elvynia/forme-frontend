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
		this.id = mission.id;
		this.duration = mission.duration;
		this.client = mission.client;
		this.tjm = mission.tjm;
		this.label = mission.label;
		this.title = mission.title;
		this.place = mission.place;
		this.travelCosts = mission.travelCosts;
		this.type = mission.type;
		this.closed = mission.closed;
		return this;
	}
}
