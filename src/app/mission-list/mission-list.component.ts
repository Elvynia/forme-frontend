import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from 	'@angular/router';
import { MatSort, MatPaginator } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FormeDataSource } from '../forme-data-source';
import { Mission } from '../mission';
import { MissionService } from '../mission.service';
import { AuthService } from '../auth.service';
import { EVENT } from '../event';

@Component({
	selector: 'app-mission-list',
	templateUrl: './mission-list.component.html',
	styleUrls: ['./mission-list.component.css'],
	animations: [
	trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
		state('expanded', style({height: '*', visibility: 'visible'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
		])
	]
})
export class MissionListComponent implements OnInit {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input() filterContext: any;
	@Input('columns') displayedColumns;
	dataSource: FormeDataSource<Mission>;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	isExpansionDetailRow = (index, row:any) => row.hasOwnProperty('detailRow');
	expandedElement;

	constructor(private missionService: MissionService,
		private authService: AuthService,
		private router: Router) {
		this.displayedColumns = ['id', 'client', 'type', 'duration', 'tjm', 'label', 'title'];
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
		if (this.filter) {
			this.dataSource.filter = this.filter;
			this.dataSource.filterContext = this.filterContext;
		}
	}

	handleExpanded(event, row: any) {
		if (this.expandedElement && this.expandedElement == row) {
			this.expandedElement = null;
		} else {
			this.expandedElement = row;
		}
	}
}
