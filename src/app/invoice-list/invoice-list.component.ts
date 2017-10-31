import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Event, EVENT } from '../event';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
	data: any[];

	constructor(private invoiceService: InvoiceService,
		private authService: AuthService,
		private router: Router) {
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.invoiceService.list()
				.subscribe((data: any) => this.data = data);
			this.invoiceService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.data.push(data));
			this.invoiceService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.update(data.id));
			this.invoiceService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.update(data.id, data));
		});
	}

	private update(id: number, invoice?: Invoice) {
		let index = this.data.findIndex((search) => search.id === id);
		if (index && index >= 0) {
			if (invoice) {
				this.data.splice(index, 1, invoice);
			} else {
				this.data.splice(index, 1);
			}
			this.data = this.data.slice();
		}
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
