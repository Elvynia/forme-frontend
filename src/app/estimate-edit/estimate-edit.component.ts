import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Company } from '../company';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';

@Component({
	selector: 'app-estimate-edit',
	templateUrl: './estimate-edit.component.html',
	styleUrls: ['./estimate-edit.component.css']
})
export class EstimateEditComponent implements OnInit {
	@Input() estimate: Estimate;
	@Input() new: boolean;

	constructor(private estimateService: EstimateService,
		private route: ActivatedRoute) {
		this.new = true;
		this.estimate = new Estimate();
	}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.new = false;
                this.estimateService.get(parseInt(paramMap.get('id')))
                    .subscribe((estimate: Estimate) => this.estimate = this.estimate.clone(estimate));
            }
        });
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['estimate']) {
			this.new = this.estimate.id === undefined || this.estimate.id === null;
		}
	}

	submit(form) {
		if (this.new) {
			this.estimateService.create(this.estimate);
		} else {
			this.estimateService.update(this.estimate);
		}
		form.resetForm(new Estimate());
	}

}
