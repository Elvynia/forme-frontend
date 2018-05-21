import { Component, OnInit, HostListener } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { EVENT } from '../../core';
import { Company } from '../company';

@Component({
    selector: 'company-management',
    templateUrl: './company-management.component.html',
    styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {
    selectedId: number;

    constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('companyId')) {
                this.selectedId = parseInt(params.get('companyId'));
            }
        });
        this.companyService.eventsByType(EVENT.DELETE)
            .filter((company) => this.selectedId && company.id === this.selectedId)
            .subscribe(() => this.selectedId = undefined);
    }

    showDetails(company: Company) {
        this.selectedId = company.id;
    }

    @HostListener('body:click', ['$event'])
    cancelSelection(event: MouseEvent) {
        this.selectedId = undefined;
    }

}
