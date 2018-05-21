import { Component, OnInit, HostListener } from '@angular/core';
import { EVENT } from '../../core';
import { Estimate } from '../estimate';
import { ActivatedRoute } from '@angular/router';
import { EstimateService } from '../estimate.service';

@Component({
    selector: 'estimate-management',
    templateUrl: './estimate-management.component.html',
    styleUrls: ['./estimate-management.component.css']
})
export class EstimateManagementComponent implements OnInit {
    selectedId: number;

    constructor(private estimateService: EstimateService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('estimateId')) {
                this.selectedId = parseInt(params.get('estimateId'));
            }
        });
        this.estimateService.eventsByType(EVENT.DELETE)
            .filter((estimate) => this.selectedId && estimate.id === this.selectedId)
            .subscribe(() => this.selectedId = undefined);
    }

    showDetails(estimate: Estimate) {
        this.selectedId = estimate.id;
    }

    @HostListener('body:click', ['$event'])
    cancelSelection(event: MouseEvent) {
        this.selectedId = undefined;
    }

}
