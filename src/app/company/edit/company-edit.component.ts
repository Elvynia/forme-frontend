import { Component, Input } from '@angular/core';

import { CompanyService } from '../company.service';
import { EntityService } from '../../core';

@Component({
    selector: 'company-edit',
    templateUrl: './company-edit.component.html',
    styleUrls: ['./company-edit.component.css'],
	providers: [
		{ provide: EntityService, useExisting: CompanyService }
	]
})
export class CompanyEditComponent {
    @Input() id: number;

}
