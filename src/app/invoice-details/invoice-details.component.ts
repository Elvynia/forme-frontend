import { Component, Input } from '@angular/core';

import { InvoiceService } from '../invoice.service';
import { EntityService } from '../core';

@Component({
	selector: 'invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.css'],
	providers: [
		{ provide: EntityService, useExisting: InvoiceService }
	]
})
export class InvoiceDetailsComponent {
	@Input() id: number;

	constructor() { }

}	
