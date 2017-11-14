import { Entity } from './entity';

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
}
