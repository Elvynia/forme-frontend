import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Company } from '../company';
import { EntityService } from '../../core';
import { CompanyService } from '../company.service';

@Component({
	selector: 'company-combobox',
	templateUrl: './company-combobox.component.html',
	styleUrls: ['./company-combobox.component.css'],
	providers: [
		{ provide: EntityService, useExisting: CompanyService }
	]
})
export class CompanyComboboxComponent {
	@Input() selection: Company;
	@Output() selectionChange: EventEmitter<Company>;

	constructor() {
		this.selectionChange = new EventEmitter();
	}

	filterCompany = function(company: Company) {
		let context: any = this;
		if (context.value && context.value.id) {
			return context.value.id !== company.id;
		} else if (typeof context.value === 'string') {
			return company.trigram.indexOf(context.value.toUpperCase()) >= 0
				|| company.name.toLowerCase().indexOf(context.value.toLowerCase()) >= 0;
		}
	}

    displayCompany = function(company: Company) {
        return company ? company.name + ' (' + company.trigram + ')' : '';
    }

}
