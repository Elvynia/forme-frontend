import { Entity } from './entity';
import { Role } from './role';
import { Company } from './company';

export class Account implements Entity {
	id: number;
	username: string;
	password?: string;
	token?: string;
	role?: Role;
	companies?: Array<Company>;

	static build(account: any): Account {
		let instance: Account = new Account();
		if (account) {
			instance.id = account.id;
			instance.username = account.username;
			instance.role = account.role;
			instance.companies = account.companies || new Array<Company>();
		}
		return instance;
	}

	constructor(id?: number) {
		this.id = id;
		this.companies = new Array();
	}
}
