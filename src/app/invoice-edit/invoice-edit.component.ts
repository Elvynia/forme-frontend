import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Event, EVENT } from '../event';
import { Company } from '../company';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit, OnChanges {
  @Input() invoice: Invoice;
  @Input() new: boolean;
  companies: Array<Company>;

  constructor(private invoiceService: InvoiceService,
    private companyService: CompanyService) {
  	this.new = true;
  	this.invoice = new Invoice();
  }

  ngOnInit() {
    this.companyService.list()
      .subscribe((data: Array<Company>) => {
        this.companies = data;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
  	if (changes['invoice']) {
  		this.new = this.invoice.id === undefined || this.invoice.id === null;
  	}
  }

  submit() {
  	if (this.new) {
  		this.invoice.creationDate = new Date().getTime();
  		this.invoiceService.create(this.invoice);
  	} else {
  		if (this.invoice.received && !this.invoice.receptionDate) {
  			this.invoice.receptionDate = new Date().getTime();
  		}
  		this.invoiceService.update(this.invoice);
  	}
    this.invoice = new Invoice();
  }

}
