import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../company.service';
import { EVENT } from '../event';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
	data: any[];

	constructor(private companyService: CompanyService) {
	}

	ngOnInit() {
		this.companyService.list()
			.subscribe((data: any) => this.data = data);
		this.companyService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => this.data.push(data));
	}

}
