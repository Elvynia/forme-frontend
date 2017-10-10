import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Event, EVENT } from '../event';
import { Company } from '../company';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';
import { CompanyService } from '../company.service';

@Component({
	selector: 'app-estimate-edit',
	templateUrl: './estimate-edit.component.html',
	styleUrls: ['./estimate-edit.component.css']
})
export class EstimateEditComponent implements OnInit {
	@Input() estimate: Estimate;
	@Input() new: boolean;
	companies: Array<Company>;

	constructor(private estimateService: EstimateService,
		private companyService: CompanyService) {
		this.new = true;
		this.estimate = new Estimate();
	}

	ngOnInit() {
		this.companyService.list()
		.subscribe((data: Array<Company>) => {
			this.companies = data;
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['estimate']) {
			this.new = this.estimate.id === undefined || this.estimate.id === null;
		}
	}

	submit() {
		if (this.new) {
			if (!this.estimate.date) {
				this.estimate.date = new Date().getTime();
			}
			this.estimateService.create(this.estimate);
		} else {
			this.estimateService.update(this.estimate);
		}
		this.estimate = new Estimate();
	}

}
