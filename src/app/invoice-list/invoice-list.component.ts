import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Event, EVENT } from '../event';
import { Company } from '../company';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
	data: any[];

	constructor(private invoiceService: InvoiceService) {
	}

	ngOnInit() {
		this.invoiceService.list()
			.subscribe((data: any) => this.data = data);
		this.invoiceService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => this.data.push(data));
	}
}
