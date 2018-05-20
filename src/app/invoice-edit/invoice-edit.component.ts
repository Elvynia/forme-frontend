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
export class InvoiceEditComponent {
    @Input() id: number;

    constructor() { }
}
