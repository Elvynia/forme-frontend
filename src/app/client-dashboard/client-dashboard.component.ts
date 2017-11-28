import { Component, OnInit, Input } from '@angular/core';

import { Account } from '../account';
import { Company } from '../company';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';
import { Mission } from '../mission';
import { MissionService } from '../mission.service';

@Component({
	selector: 'app-client-dashboard',
	templateUrl: './client-dashboard.component.html',
	styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
	@Input() account: Account;

	constructor(private invoiceService: InvoiceService,
		private estimateService: EstimateService,
		private missionService: MissionService) {

	}

	ngOnInit() {

	}

	public pendingInvoices(invoice: Invoice): boolean {
		return this.account && invoice.pending && this.account.companies.findIndex((company: Company) => company.id === invoice.client.id) >= 0;
	}

	public pendingEstimates(estimate: Estimate): boolean {
		return this.account && !estimate.signed && this.account.companies.findIndex((company: Company) => company.id === estimate.clientId) >= 0;
	}

	public pendingMissions(mission: Mission): boolean {
		return this.account && !mission.closed && this.account.companies.findIndex((company: Company) => company.id === mission.clientId) >= 0;
	}
}
