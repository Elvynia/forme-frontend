import { Component, Input } from '@angular/core';

import { InvoiceService } from '../invoice.service';
import { EntityService } from '../../core';

@Component({
    selector: 'invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.css'],
	providers: [
		{ provide: EntityService, useExisting: InvoiceService }
	]
})
export class InvoiceEditComponent {
    @Input() id: number;
    
}
