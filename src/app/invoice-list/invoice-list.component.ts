import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FormeDataSource } from '../forme-data-source';
import { Event, EVENT } from '../event';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { AuthService } from '../auth.service';
import { Uuid } from '../uuid';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
  animations: [
  	trigger('detailExpand', [
  		state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
  		state('expanded', style({height: '*', visibility: 'visible'})),
  		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  	])
  ]
})
export class InvoiceListComponent implements OnInit {
	@Input() details: any;
	dataSource: FormeDataSource<Invoice>;
	displayedColumns = ['id', 'clientId', 'label', 'amount', 'pending', 'received'];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	uuid: Uuid;
	isExpansionDetailRow = (index, row:any) => row.hasOwnProperty('detailRow');
	expandedInvoice;

	public get id(): string {
		return this.uuid.value;
	}

	constructor(private invoiceService: InvoiceService,
		private authService: AuthService) {
		this.uuid = new Uuid();		
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.invoiceService.list()
				.subscribe((data: any) => this.dataSource && this.dataSource.publish(data));
			this.invoiceService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.dataSource && this.dataSource.add(data));
			this.invoiceService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id));
			this.invoiceService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id, data));
		});
		this.dataSource = new FormeDataSource(this.paginator, this.sort);
	}

	handleExpanded(event, row: any) {
		if (this.expandedInvoice && this.expandedInvoice == row) {
			this.expandedInvoice = null;
		} else {
			this.expandedInvoice = row;
		}
		event.stopPropagation();
	}
}
