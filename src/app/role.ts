import { Entity } from './core';

export class Role implements Entity {
	id: number;
	name: string;

	constructor(id?: number) {
		this.id = id;
	}

	public clone(mission: Role): Role {
		// TODO implements.
		return null;
	}
}
