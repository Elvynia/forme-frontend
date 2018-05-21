import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Company } from '../company';
import { CompanyService } from '../company.service';

import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'app-company-combobox',
	templateUrl: './company-combobox.component.html',
	styleUrls: ['./company-combobox.component.css']
})
export class CompanyComboboxComponent implements OnInit {
	@Input() selection: Company;
	@Output() selectionChange: EventEmitter<Company>;
	clientControl: FormControl;
	companies: Array<Company>;
	filteredCompanies: Observable<Company[]>;

	constructor(private companyService: CompanyService) {
		this.selectionChange = new EventEmitter();
		this.companies = [];
        this.clientControl = new FormControl();
        this.filteredCompanies = this.clientControl.valueChanges
            .startWith(null)
            .map((value: string) => value ? this.filterCompanies(value) : this.companies.slice());
	}

	ngOnInit() {
		this.companyService.list()
	        .subscribe((data: Array<Company>) => {
	            this.companies = data;
	        });
	}

    filterCompanies(filter: string) {
        if (typeof filter === "string") { 
            return this.companies.filter((company: Company) => 
            	company.trigram.indexOf(filter.toUpperCase()) >= 0
                || company.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
        }
    }

    displayCompany(company: Company) {
        return company ? company.name + ' (' + company.trigram + ')' : '';
    }

    updateSelection(event: MatAutocompleteSelectedEvent) {
    	this.selectionChange.next(event.option.value);
    }

}
