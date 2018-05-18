import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';

@Component({
	selector: 'invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
	@Input() id: number;
	@Input() hideTitle: boolean;
	invoice: Invoice;

	constructor(private invoiceService: InvoiceService,
		private router: Router) {
		this.hideTitle = false;
	}

	ngOnInit() {
		if (this.id) {
			this.invoiceService.get(this.id)
				.subscribe((invoice: Invoice) => this.invoice = invoice);
		}
	}

	modifySelected() {
		if (this.invoice) {
			this.router.navigate(['/invoice/', this.invoice]);
		}
	}

	deleteSelected() {
		if (this.invoice &&
				confirm("Voulez-vous vraiment supprimer cette facture ?")) {
			this.invoiceService.delete(this.invoice);
		}
	}
	
}	
