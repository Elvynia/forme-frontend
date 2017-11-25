import { Entity } from './entity';
import { Role } from './role';

export class Account implements Entity {
	id: number;
	username: string;
	password?: string;
	token?: string;
	role?: Role;

	static build(account: any): Account {
		let instance: Account = new Account();
		if (account) {
			instance.id = account.id;
			instance.username = account.username;
			instance.role = account.role;
		}
		return instance;
	}

	constructor(id?: number) {
		this.id = id;
	}
}
