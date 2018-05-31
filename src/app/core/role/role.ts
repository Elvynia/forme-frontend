import { Entity } from '../entity/entity';

export class Role implements Entity {
	id: number;
	name: string;

	constructor(id?: number) {
		this.id = id;
	}

	public clone(role: Role): Role {
		this.id = role.id;
		this.name = role.name;
		return this;
	}

	public getClassName(): string {
		return "Role";
	}
}
