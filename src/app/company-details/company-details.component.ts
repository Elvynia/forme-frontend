import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
	selector: 'app-company-details',
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
	@Input() id: number;
	@Input() hideTitle: boolean;
	company: Company;

	constructor(private companyService: CompanyService,
		private router: Router) {
		this.hideTitle = false;
	}

	ngOnInit() {
		if (this.id) {
			this.companyService.get(this.id)
			.subscribe((company: Company) => this.company = company);
		}
	}

	modifySelected() {
		if (this.company) {
			this.router.navigate(['/company/', this.company]);
		}
	}

	deleteSelected() {
		if (this.company &&
			confirm("Voulez-vous vraiment supprimer ce client ?")) {
			this.companyService.delete(this.company);
		}
	}
	
}
