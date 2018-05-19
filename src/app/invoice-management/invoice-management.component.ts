import { Component, OnInit, HostListener } from '@angular/core';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { EVENT } from '../event';

@Component({
    selector: 'app-invoice-management',
    templateUrl: './invoice-management.component.html',
    styleUrls: ['./invoice-management.component.css']
})
export class InvoiceManagementComponent implements OnInit {
    selectedId: number;

    constructor(private invoiceService: InvoiceService) { }

    ngOnInit() {
        this.invoiceService.eventsByType(EVENT.DELETE)
            .filter((invoice) => this.selectedId && invoice.id === this.selectedId)
            .subscribe(() => this.selectedId = undefined);
    }

    showDetails(invoice: Invoice) {
        this.selectedId = invoice.id;
    }

    @HostListener('body:click', ['$event'])
    cancelSelection(event: MouseEvent) {
        this.selectedId = undefined;
    }

}
