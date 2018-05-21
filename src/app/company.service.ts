import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from './company';
import { EntityService, AuthService } from './core';

@Injectable()
export class CompanyService extends EntityService<Company> {

	getNew(): Company {
		return new Company();
	}

	protected initialize() {
		this.apiPath += '/company';
		super.initialize();
	}

}
