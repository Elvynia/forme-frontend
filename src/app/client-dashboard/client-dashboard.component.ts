import { Component, OnInit, Input } from '@angular/core';

import { Company } from '../company/company';
import { Invoice } from '../invoice/invoice';
import { InvoiceService } from '../invoice/invoice.service';
import { Estimate } from '../estimate/estimate';
import { EstimateService } from '../estimate/estimate.service';
import { Mission } from '../mission/mission';
import { MissionService } from '../mission/mission.service';
import { FormeAccount } from '../forme-account';

@Component({
	selector: 'app-client-dashboard',
	templateUrl: './client-dashboard.component.html',
	styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
	@Input() account: FormeAccount;

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
		return this.account && !estimate.signed && this.account.companies.findIndex((company: Company) => company.id === estimate.client.id) >= 0;
	}

	public pendingMissions(mission: Mission): boolean {
		return this.account && !mission.closed && this.account.companies.findIndex((company: Company) => company.id === mission.client.id) >= 0;
	}
}
