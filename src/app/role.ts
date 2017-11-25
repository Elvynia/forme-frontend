import { Entity } from './entity';

export class Role implements Entity {
	id: number;
	name: string;

	constructor(id?: number) {
		this.id = id;
	}
}
