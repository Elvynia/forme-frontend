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
export class InvoiceListComponent implements OnInit, OnChanges {
	@Input() title: string;
	@Input() filter: (a:any, b:any) => number;
	@Input() _limit: number;
	private data: any[];
	filteredData: Observable<any[]>;
	limitOn: boolean;
	showMoreLess: boolean;

	get limit(): number {
		return this.limitOn ? this._limit : this.data.length;
	}

	constructor(private invoiceService: InvoiceService) {
		this._limit = 5;
		this.limitOn = true;
		this.showMoreLess = true;
	}

	ngOnInit() {
		this.refreshLimit();
		this.invoiceService.list()
			.subscribe((data: any) => {
				this.data = data;
				this.reloadFilter();
			});
		this.invoiceService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => {
				this.data.push(data);
				this.reloadFilter();
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['limit']) {
			this.refreshLimit();
		}
	}

	public switchLimit() {
		this.limitOn = !this.limitOn;
	}

	private refreshLimit() {
		if (this._limit <= 0) {
			this.showMoreLess = false;
		} else {
			this.showMoreLess = true;
		}
	}

	private reloadFilter() {
		this.filteredData = Observable.of(this.data).map((list) => list.sort(this.filter));
	}
}
