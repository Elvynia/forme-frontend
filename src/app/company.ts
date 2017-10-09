import { Entity } from './entity';

export class Company implements Entity {
	id: number;
	address: string;
	name: string;
	trigram: string;
	siren?: string;
	siret?: string;
	rcs?: string;
}
