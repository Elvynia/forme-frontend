import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
    selector: 'app-company-edit',
    templateUrl: './company-edit.component.html',
    styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit, OnChanges {
    @Input() company: Company;
    @Input() new: boolean;

    constructor(private companyService: CompanyService,
        private route: ActivatedRoute) {
        this.new = true;
        this.company = new Company();
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.new = false;
                this.companyService.get(parseInt(paramMap.get('id')))
                    .subscribe((company: Company) => this.company = company);
            }
        });
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
