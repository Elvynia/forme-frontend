import { Entity } from './entity';

export type Authority = {id: string, name: string, authority: 'ADMIN'|'CLIENT'|'GUEST'};

export class Account implements Entity {
	id: number;
	username: string;
	password?: string;
	authorities?: Authority[];
	token?: string;

	constructor(id?: number) {
		this.id = id;
	}
}
