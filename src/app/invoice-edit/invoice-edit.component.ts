import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Event, EVENT } from '../event';
import { Company } from '../company';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { CompanyService } from '../company.service';

import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit, OnChanges {
    @Input() invoice: Invoice;
    @Input() new: boolean;
    clientControl: FormControl;
    companies: Array<Company>;
    filteredCompanies: Observable<Company[]>;

    constructor(private invoiceService: InvoiceService,
        private companyService: CompanyService,
        private route: ActivatedRoute) {
        this.new = true;
        this.companies = [];
        this.invoice = new Invoice();
        this.clientControl = new FormControl();
        this.filteredCompanies = this.clientControl.valueChanges
            .startWith(null)
            .map((value: string) => value ? this.filterCompanies(value) : this.companies.slice());
    }

    ngOnInit() {
        this.companyService.list()
        .subscribe((data: Array<Company>) => {
            this.companies = data;
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.new = false;
                this.invoiceService.get(parseInt(paramMap.get('id')))
                .subscribe((invoice: any) => this.invoice = Invoice.build(invoice));
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['invoice']) {
            this.new = this.invoice.id === undefined || this.invoice.id === null;
        }
    }

    submit(form) {
        if (this.new) {
            this.invoiceService.create(this.invoice);
        } else {
            this.invoiceService.update(this.invoice);
        }
        form.resetForm(new Invoice());
    }

    filterCompanies(filter: string) {
        if (typeof filter === "string") { 
            return this.companies.filter((company: Company) => 
            	company.trigram.indexOf(filter.toUpperCase()) >= 0
                || company.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
        }
    }

    displayCompany(company: Company) {
        return company ? company.name + ' (' + company.trigram + ')' : '';
    }
}
