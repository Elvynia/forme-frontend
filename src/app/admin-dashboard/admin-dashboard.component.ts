import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { Observable } from 'rxjs/Rx';

import { Invoice } from '../invoice';
import { Mission } from '../mission';
import { InvoiceService } from '../invoice.service';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
	pendingFilter = (invoice: Invoice) => invoice.pending;
	toDeclareFilter = (invoice: Invoice) => {
		let rec = moment(invoice.receptionDate);
		let dec = moment().subtract(1, 'month');
		return !invoice.received || rec.year() === dec.year() && rec.month() >= dec.month();
	};
	missionFilter = (mission: Mission) => !mission.closed;
	months: Array<string>;
	invoices: Array<[number, Array<Invoice>]>;
	invoiceList: Array<Invoice>;
	currentYear: number;

	constructor(private invoiceService: InvoiceService) {
		this.months = moment.months();
		this.currentYear = moment().year();
	}

	ngOnInit() {
		this.invoiceService.list().take(1)
			.subscribe((list) => {
				this.invoiceList = list;
				this.invoices = [];
				list.forEach((invoice: Invoice) => {
					let crea = moment(invoice.creationDate);
					if (crea.year() === moment().year()) {
						let index:number = crea.month();
						let exists:boolean = false;
						for (let group of this.invoices) {
							if(group[0] === index) {
								group[1].push(invoice);
								exists = true;
								break;
							}
						}
						if (!exists) {
							let groupList = new Array<Invoice>();
							groupList.push(invoice);
							this.invoices.push([index, groupList]);
						}
					}
				})
			});
	}

	getMonthPos(width: number, i: number): string {
		return Math.floor(i * width / this.months.length) + 'px';
	}

	calculateTurnover(year: number): number {
		if (this.invoiceList) {
			return this.invoiceList.filter(
			(invoice: Invoice) => invoice.received
				&& moment(invoice.receptionDate).year() === year)
			.map((invoice: Invoice) => invoice.amount)
			.reduce((prev, cur) => prev + cur);
		} else {
			return 0;
		}
	}
}
