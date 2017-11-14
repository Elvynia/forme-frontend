import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';

@Component({
	selector: 'app-estimate-details',
	templateUrl: './estimate-details.component.html',
	styleUrls: ['./estimate-details.component.css']
})
export class EstimateDetailsComponent implements OnInit {
	@Input() id: number;
	@Input() hideTitle: boolean;
	estimate: Estimate;

	constructor(private estimateService: EstimateService,
		private router: Router) {
		this.hideTitle = false;
	}

	ngOnInit() {
		if (this.id) {
			this.estimateService.get(this.id)
			.subscribe((estimate: Estimate) => this.estimate = estimate);
		}
	}

	modifySelected() {
		if (this.estimate) {
			this.router.navigate(['/estimate/', this.estimate]);
		}
	}

	deleteSelected() {
		if (this.estimate
			&& confirm("Voulez-vous vraiment supprimer ce devis ?")) {
			this.estimateService.delete(this.estimate);
		}
	}

}
