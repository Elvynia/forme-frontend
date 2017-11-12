import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FormeDataSource } from '../forme-data-source';
import { Event, EVENT } from '../event';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css'],
	animations: [
	trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
		state('expanded', style({height: '*', visibility: 'visible'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
		])
	]
})
export class EstimateListComponent implements OnInit {
	@Input() details: any;
	@Input('columns') displayedColumns;
	dataSource: FormeDataSource<Estimate>;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	isExpansionDetailRow = (index, row:any) => row.hasOwnProperty('detailRow');
	expandedElement;

	constructor(private estimateService: EstimateService,
		private authService: AuthService) {
		this.displayedColumns = ['id', 'clientId', 'amount', 'date', 'signed'];
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

	handleExpanded(event, row: any) {
		if (this.expandedElement && this.expandedElement == row) {
			this.expandedElement = null;
		} else {
			this.expandedElement = row;
		}
		event.stopPropagation();
	}

}
