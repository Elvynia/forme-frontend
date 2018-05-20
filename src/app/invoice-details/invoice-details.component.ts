import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { Subscription } from 'rxjs';
import { SimpleChanges } from '@angular/core';

@Component({
	selector: 'invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
	@Input() id: number;

	constructor() { }

}	
