import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { EVENT } from '../../core';

@Component({
    selector: 'invoice-management',
    templateUrl: './invoice-management.component.html',
    styleUrls: ['./invoice-management.component.css']
})
export class InvoiceManagementComponent implements OnInit {
    selectedId: number;

    constructor(private invoiceService: InvoiceService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('invoiceId')) {
                this.selectedId = parseInt(params.get('invoiceId'));
            }
        });
        this.invoiceService.eventsByType(EVENT.DELETE)
            .filter((invoice) => this.selectedId && invoice.id === this.selectedId)
            .subscribe(() => this.selectedId = undefined);
    }

    showDetails(invoice: Invoice) {
        this.selectedId = invoice.id;
    }

    // TODO: Call on edit cancel.
    cancelSelection(event: MouseEvent) {
        this.selectedId = undefined;
    }

}
