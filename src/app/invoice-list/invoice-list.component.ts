import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormeDataSource } from '../core/forme-data-source';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { EntityService, AuthService } from '../core';

@Component({
	selector: 'invoice-list',
	templateUrl: './invoice-list.component.html',
	styleUrls: ['./invoice-list.component.css'],
	providers: [
		{ provide: EntityService, useExisting: InvoiceService }
	]
})
export class InvoiceListComponent {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input() filterContext: any;
	@Input('columns') displayedColumns;
	@Output() onSelect: EventEmitter<Invoice>;

	constructor() {
		this.listTitle = 'Toutes les factures';
		this.displayedColumns = ['id', 'client', 'label', 'amount', 'creationDate', 'pending', 'received', 'receptionDate'];
		this.onSelect = new EventEmitter();
	}

	select(invoice: Invoice) {
		this.onSelect.next(invoice);
	}
}
