import { Entity } from './core';

export class Company implements Entity {
	id: number;
	address: Array<string>;
	name: string;
	trigram: string;
	siren?: string;
	siret?: string;
	rcs?: string;

	constructor(id?: number) {
		this.id = id;
	}

	public clone(company: Company): Company {
		this.id = company.id;
		this.address = company.address;
		this.name = company.name;
		this.trigram = company.trigram;
		this.siren = company.trigram;
		this.siren = company.siren;
		this.siret = company.siret;
		this.rcs = company.rcs
		return this;
	}
}
