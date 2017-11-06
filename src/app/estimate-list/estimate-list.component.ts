import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';

import { FormeDataSource } from '../forme-data-source';
import { Event, EVENT } from '../event';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';
import { AuthService } from '../auth.service';
import { Uuid } from '../uuid';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css']
})
export class EstimateListComponent implements OnInit {
	@Input() details: any;
	dataSource: FormeDataSource<Estimate>;
	displayedColumns = ['id', 'clientId', 'amount', 'date', 'signed'];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	uuid: Uuid;

	public get id(): string {
		return this.uuid.value;
	}

	constructor(private estimateService: EstimateService,
		private authService: AuthService,
		private router: Router) {
		this.uuid = new Uuid();
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.estimateService.list()
				.subscribe((data: any) => this.dataSource && this.dataSource.publish(data));
			this.estimateService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.dataSource && this.dataSource.add(data));
			this.estimateService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id));
			this.estimateService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id, data));
		});
		this.dataSource = new FormeDataSource(this.paginator, this.sort);
	}

	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/estimate/', selected[0]]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((id: number) => {
				this.estimateService.delete(new Estimate(id));
			});
		}
	}

}
