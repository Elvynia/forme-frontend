import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';

import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-ref',
  templateUrl: './company-ref.component.html',
  styleUrls: ['./company-ref.component.css']
})
export class CompanyRefComponent implements OnChanges {
  @Input() id: number;
  clientName: Observable<string>;

  constructor(private companyService: CompanyService) { }

  ngOnChanges(changes: SimpleChanges) {
  	if (changes['id'] && this.id) {
  	  this.clientName = this.companyService.get(this.id)
  	  	.map((company: Company) => company.name);
  	} else {
  		this.clientName = Observable.of('N/A');
  	}
  }
}
