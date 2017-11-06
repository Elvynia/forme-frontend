import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';

import { FormeDataSource } from '../forme-data-source';
import { Event, EVENT } from '../event';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { AuthService } from '../auth.service';
import { Uuid } from '../uuid';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
	@Input() details: any;
	dataSource: FormeDataSource<Invoice>;
	displayedColumns = ['id', 'clientId', 'label', 'amount', 'pending', 'received'];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	uuid: Uuid;

	public get id(): string {
		return this.uuid.value;
	}

	constructor(private invoiceService: InvoiceService,
		private authService: AuthService,
		private router: Router) {
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


	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/invoice/', selected[0]]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((id: number) => {
				this.invoiceService.delete(new Invoice(id));
			});
		}
	}
}
