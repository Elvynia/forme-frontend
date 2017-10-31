import { Entity } from './entity';

export class Account implements Entity {
	id: number;
	username: string;
	password: string;
	roleId?: number;
	token?: string;

	constructor(id?: number) {
		this.id = id;
	}
}
