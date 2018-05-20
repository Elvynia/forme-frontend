import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Invoice } from '../invoice';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
	selector: 'app-invoice-docgen',
	templateUrl: './invoice-docgen.component.html',
	styleUrls: ['./invoice-docgen.component.css']
})
export class InvoiceDocgenComponent implements OnInit {
	@Input() invoice: Invoice;
	line: any;
	lines: Array<any>;
	companies: Array<Company>;
	previsualize: boolean;
	step: number;
	compareCompany = (a, b) => a && b && a.id === b.id;

	constructor(private companyService: CompanyService) {
		this.line = this.resetLine();
		this.previsualize = false;
		this.lines = new Array();
	}

	ngOnInit() {
		if (this.invoice) {
			this.invoice['clientDoc'] = this.invoice.client ? new Invoice().clone(this.invoice.client) : null;
		}
		this.companyService.list().subscribe((list) => this.companies = list);
	}

	submit(form) {
		this.lines.push({
			title: this.line.title,
			quantity: this.line.quantity,
			unitCost: this.line.unitCost,
			totalCost: this.line.quantity * this.line.unitCost
		});
		form.resetForm(this.resetLine());
	}

	resetLine() {
		return {
			title: 'Jours de prestation de ',
			quantity: 1,
			unitCost: 300
		};
	}

	setStep(step: number) {
		if (step < 0) {
			this.step = 0;
			this.lines = [];
			this.line = this.resetLine()
		} else {
			this.step = step;
		}
	}

	previsualizeDoc(show: boolean) {
		this.previsualize = show;
	}

	generateDoc() {
		this.previsualizeDoc(true);
		let toPrint = document.querySelector('div.print div.body').innerHTML;
		let pWindow = window.open('', '_blank');
		pWindow.document.body.innerHTML = toPrint;
		let link = pWindow.document.createElement('link');
		link.href = 'http://localhost:4200/assets/invoice-model.css';
		link.rel = 'stylesheet'; 
		pWindow.document.body.appendChild(link);
		setTimeout(() => {
			pWindow.print();
		}, 200);
	}

	@HostListener('window:keyup', ['$event'])
	public escapePrevisualization(event: KeyboardEvent) {
		// tab, escape, space.
		if (this.previsualize && [9, 27, 32].indexOf(event.keyCode) >= 0) {
			this.previsualizeDoc(false);
		}
	}
}
