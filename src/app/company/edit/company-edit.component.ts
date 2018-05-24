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

    removeSpacing(event: ClipboardEvent, maxLength: number) {
        let data = event.clipboardData.getData("text/plain");
        let trimmed = data.replace(/\s/g, '');
        if (trimmed && data !== trimmed) {
            event.preventDefault();
            (<HTMLInputElement>event.target).value = trimmed.slice(0, maxLength);
        }
    }
}
