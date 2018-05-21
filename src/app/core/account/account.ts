import { Entity } from '../entity/entity';
import { Role } from '../role/role';
import { Injectable } from '@angular/core';

@Injectable()
export class Account implements Entity {
	id: number;
	username: string;
	password?: string;
	token?: string;
	role?: Role;
	
	public clone(account: Account): Account {
		this.id = account.id;
		this.username = account.username;
		this.password = account.password;
		this.token = account.token;
		this.role = account.role;
		return this;
	}
}
