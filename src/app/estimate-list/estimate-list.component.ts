import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event, EVENT } from '../event';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css']
})
export class EstimateListComponent implements OnInit {
	data: Estimate[];

	constructor(private estimateService: EstimateService,
		private authService: AuthService,
		private router: Router) {
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.estimateService.list()
				.subscribe((data: any) => this.data = data);
			this.estimateService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.data.push(data));
			this.estimateService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.update(data.id));
			this.estimateService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.update(data.id, data));
		});
	}

	private update(id: number, estimate?: Estimate) {
		let index = this.data.findIndex((search) => search.id === id);
		if (index && index >= 0) {
			if (estimate) {
				this.data.splice(index, 1, estimate);
			} else {
				this.data.splice(index, 1);
			}
			this.data = this.data.slice();
		}
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
