import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
	private subscription: Subscription;
	@Input() id: number;
	@Input() hideTitle: boolean;
	@Input() actions: Array<string>;
	@Output() onShowEdit: EventEmitter<Invoice>;
	invoice: Invoice;

	constructor(private invoiceService: InvoiceService,
		private router: Router) {
		this.hideTitle = false;
		this.onShowEdit = new EventEmitter();
	}

	ngOnInit() {
		this.refresh();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.id) {
			this.refresh();
		}
	}

	handleAction(event: MouseEvent, action: string) {
		switch (action) {
			case 'delete':
				if (this.invoice.id && confirm("Voulez-vous vraiment supprimer cette facture ?")) {
					this.invoiceService.delete(this.invoice);
				} else {
					// Cancel message.
				}
				break;
			case 'edit':
				this.onShowEdit.next(this.invoice);
				break;
			default:
			// FIXME Logger warn.
		}
	}

	private refresh() {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = null;
			this.invoice = undefined;
		}
		if (this.id) {
			this.subscription = this.invoiceService.get(this.id)
				.subscribe((invoice: Invoice) => this.invoice = Invoice.build(invoice));
		}
	}

}	
