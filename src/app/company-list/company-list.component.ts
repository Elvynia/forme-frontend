import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../company';
import { CompanyService } from '../company.service';
import { AuthService } from '../auth.service';
import { EVENT } from '../event';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
	@Input() details: any;
	data: any[];

	constructor(private companyService: CompanyService,
		private authService: AuthService,
		private router: Router) {
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.companyService.list()
				.subscribe((data: any) => this.data = data);
			this.companyService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.data.push(data));
			this.companyService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.update(data.id));
			this.companyService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.update(data.id, data));
		});
	}

	private update(id: number, company?: Company) {
		let index = this.data.findIndex((search) => search.id === id);
		if (index && index >= 0) {
			if (company) {
				this.data.splice(index, 1, company);
			} else {
				this.data.splice(index, 1);
			}
			this.data = this.data.slice();
		}
	}


	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/company/', selected[0].id]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((company: Company) => {
				this.companyService.delete(company);
			});
		}
	}

}
