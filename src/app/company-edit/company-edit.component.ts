import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnChanges {
  @Input() company: Company;
  @Input() new: boolean;

  constructor(private companyService: CompanyService) {
  	this.new = true;
  	this.company = new Company();
  }

  ngOnChanges(changes: SimpleChanges) {
  	if (changes['company']) {
  		this.new = this.company.id === undefined || this.company.id === null;
  	}
  }

  submit() {
  	if (this.new) {
  		this.companyService.create(this.company);
  	} else {
  		this.companyService.update(this.company);
  	}
    this.company = new Company();
  }

}
