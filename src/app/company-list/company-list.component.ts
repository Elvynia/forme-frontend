import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';

import { FormeDataSource } from '../forme-data-source';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { AuthService } from '../auth.service';
import { EVENT } from '../event';
import { Uuid } from '../uuid';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
	@Input() details: any;
	dataSource: FormeDataSource<Company>;
	displayedColumns = ['id', 'trigram', 'name', 'siren', 'rcs'];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	uuid: Uuid;

	public get id(): string {
		return this.uuid.value;
	}

	constructor(private companyService: CompanyService,
		private authService: AuthService,
		private router: Router) {
		this.uuid = new Uuid();
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.companyService.list()
				.subscribe((data: any) => this.dataSource && this.dataSource.publish(data));
			this.companyService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.dataSource && this.dataSource.add(data));
			this.companyService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id));
			this.companyService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id, data));
		});
		this.dataSource = new FormeDataSource(this.paginator, this.sort);
	}

	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/company/', selected[0]]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((id:number) => {
				this.companyService.delete(new Company(id));
			});
		}
	}

}
