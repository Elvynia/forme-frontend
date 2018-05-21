import { Account } from "./core";
import { Company } from './company';
import { Injectable } from "@angular/core";

@Injectable()
export class FormeAccount extends Account {
    companies?: Array<Company>;
    
    constructor() {
		super();
		this.companies = new Array();
    }

    public get isAdmin(): boolean {
		return this.role && this.role.name === 'ADMIN';
	}

	public get isClient(): boolean {
		return this.isAdmin || this.role.name === 'CLIENT';
	}
    
    public clone(account: any): FormeAccount {
        this.companies = account.companies || new Array<Company>();
        return <FormeAccount>super.clone(account);
    }
    
}
