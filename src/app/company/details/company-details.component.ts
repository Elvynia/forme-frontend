import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../company';
import { CompanyService } from '../company.service';
import { EntityService } from '../../core';

@Component({
	selector: 'company-details',
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.css'],
	providers: [
		{ provide: EntityService, useExisting: CompanyService }
	]
})
export class CompanyDetailsComponent {
	@Input() id: number;

}
