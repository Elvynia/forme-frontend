import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit, OnChanges {
    @Input() id: number;
    invoice: Invoice;

    constructor(private invoiceService: InvoiceService) {
        this.invoice = new Invoice();
    }

    ngOnInit() {
        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.id) {
            this.refresh();
        }
    }

    submit(form: NgForm) {
        if (this.invoice.id) {
            this.invoiceService.update(this.invoice);
        } else {
            this.invoiceService.create(this.invoice);
        }
        // FIXME: Input? form.resetForm(new Invoice());
    }

    private refresh() {
		if (this.id) {
			this.invoiceService.get(this.id).take(1)
				.subscribe((invoice: Invoice) => this.invoice = this.invoice.clone(invoice));
		} else {
			this.invoice = new Invoice();
		}
	}
}
