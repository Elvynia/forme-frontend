import { Component, Input } from '@angular/core';

import { FormeDataSource } from '../core/forme-data-source';
import { Event, EVENT } from '../event';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { AuthService } from '../core/auth.service';
import { EntityService } from '../core/entity.service';

@Component({
	selector: 'invoice-list',
	templateUrl: './invoice-list.component.html',
	styleUrls: ['./invoice-list.component.css'],
	providers: [
		{ provide: EntityService, useClass: InvoiceService }
	]
})
export class InvoiceListComponent {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input() filterContext: any;
	@Input('columns') displayedColumns;

	constructor() {
		this.listTitle = 'Toutes les factures';
		this.displayedColumns = ['id', 'client', 'amount', 'creationDate', 'pending', 'received', 'receptionDate'];
	}
}
