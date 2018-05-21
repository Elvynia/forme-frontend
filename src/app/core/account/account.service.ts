import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from './account';
import { EntityService } from '../entity/entity.service';

@Injectable()
export class AccountService extends EntityService<Account> {

	protected initialize() {
		this.apiPath += '/account';
		super.initialize();
	}

	getNew(): Account {
		return new Account();
	}

}
