import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
		private companyService: CompanyService,
		private route: ActivatedRoute) {
		this.new = true;
		this.estimate = new Estimate();
	}

	ngOnInit() {
		this.companyService.list()
		.subscribe((data: Array<Company>) => {
			this.companies = data;
		});
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.new = false;
                this.estimateService.get(parseInt(paramMap.get('id')))
                    .subscribe((estimate: Estimate) => this.estimate = estimate);
            }
        });
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['estimate']) {
			this.new = this.estimate.id === undefined || this.estimate.id === null;
		}
	}

	submit() {
		if (this.new) {
			this.estimateService.create(this.estimate);
		} else {
			this.estimateService.update(this.estimate);
		}
		this.estimate = new Estimate();
	}

}
