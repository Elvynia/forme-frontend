import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from './company';
import { EntityService, AuthService } from '../core';
import { trigger } from '@angular/animations';

@Injectable()
export class CompanyService extends EntityService<Company> {

	getNew(): Company {
		return new Company();
	}

	protected initialize() {
		this.apiPath += '/company';
		super.initialize();
	}

	exportData(data: Array<Company>): Array<any> {
		return data.map((c) => <any>{
			id: c.id,
			address: c.address,
			name: c.name,
			trigram: c.trigram,
			siren: c.siren,
			siret: c.siret,
			rcs: c.rcs
		});
	}

	importData(data: Array<any>) {
		let companies = data.map((obj) => {
			let company = new Company();
			company.address = obj.address;
			company.name = obj.name;
			company.trigram = obj.trigram;
			company.siren = obj.siren;
			company.siret = obj.siret;
			company.rcs = obj.rcs;
		});
		super.importData(companies);
	}

}
