import { Component, OnInit } from '@angular/core';

import { Event, EVENT } from '../event';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css']
})
export class EstimateListComponent implements OnInit {
	data: Estimate[];

	constructor(private estimateService: EstimateService) {
	}

	ngOnInit() {
		this.estimateService.list()
			.subscribe((data: any) => this.data = data);
		this.estimateService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => this.data.push(data));
	}

}
