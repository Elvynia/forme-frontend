import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from 	'@angular/router';
import { MatSort, MatPaginator } from '@angular/material';

import { FormeDataSource } from '../forme-data-source';
import { Mission } from '../mission';
import { MissionService } from '../mission.service';
import { AuthService } from '../auth.service';
import { EVENT } from '../event';
import { Uuid } from '../uuid';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {
	@Input() details: any;
	dataSource: FormeDataSource<Mission>;
	displayedColumns = ['id', 'clientId', 'type', 'duration', 'tjm', 'label', 'title', 'travelCosts'];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	uuid: Uuid;

	public get id(): string {
		return this.uuid.value;
	}

	constructor(private missionService: MissionService,
		private authService: AuthService,
		private router: Router) {
		this.uuid = new Uuid();
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.missionService.list()
				.subscribe((data: any) => this.dataSource && this.dataSource.publish(data));
			this.missionService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.dataSource && this.dataSource.add(data));
			this.missionService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id));
			this.missionService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id, data));
		});
		this.dataSource = new FormeDataSource(this.paginator, this.sort);
	}

	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/mission/', selected[0]]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((id: number) => {
				this.missionService.delete(new Mission(id));
			});
		}
	}

}
