import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

	constructor(private estimateService: EstimateService,
		private router: Router) {
	}

	ngOnInit() {
		this.estimateService.list()
			.subscribe((data: any) => this.data = data);
		this.estimateService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => this.data.push(data));
		this.estimateService.eventsByType(EVENT.DELETE)
			.subscribe((data: any) => {
				let index = this.data.findIndex((search) => search.id === data.id);
				if (index && index >= 0) {
					this.data.splice(index, 1);
					this.data = this.data.slice();
				}
			});
	}

	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/estimate/', selected[0].id]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((estimate: Estimate) => {
				this.estimateService.delete(estimate);
			});
		}
	}

}
