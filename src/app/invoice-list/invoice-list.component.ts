import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Event, EVENT } from '../event';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
	data: any[];

	constructor(private invoiceService: InvoiceService,
		private router: Router) {
	}

	ngOnInit() {
		this.invoiceService.list()
			.subscribe((data: any) => this.data = data);
		this.invoiceService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => this.data.push(data));
		this.invoiceService.eventsByType(EVENT.DELETE)
			.subscribe((data: any) => {
				let index = this.data.findIndex((search) => search.id === data.id);
				if (index && index >= 0) {
					this.data.splice(index, 1);
					this.data = this.data.slice();
				}
			});
	}

	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/invoice/', selected[0].id]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((invoice: Invoice) => {
				this.invoiceService.delete(invoice);
			});
		}
	}
}
