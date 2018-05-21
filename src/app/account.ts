import { Entity } from './core';
import { Role } from './role';
import { Company } from './company';

export class Account implements Entity {
	id: number;
	username: string;
	password?: string;
	token?: string;
	role?: Role;
	companies?: Array<Company>;

	public get isAdmin(): boolean {
		return this.role && this.role.name === 'ADMIN';
	}

	public get isClient(): boolean {
		return this.isAdmin || this.role.name === 'CLIENT';
	}
	
	constructor(id?: number) {
		this.id = id;
		this.companies = new Array();
	}
	
	public clone(account: Account): Account {
		let clone: Account = new Account();
		if (account) {
			clone.id = account.id;
			clone.username = account.username;
			clone.role = account.role;
			clone.companies = account.companies || new Array<Company>();
		}
		return clone;
	}
}
