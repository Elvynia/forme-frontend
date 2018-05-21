import { Component, OnInit, HostListener } from '@angular/core';
import { MissionService } from '../mission.service';
import { ActivatedRoute } from '@angular/router';
import { EVENT } from '../../core';
import { Mission } from '../mission';

@Component({
    selector: 'app-mission-management',
    templateUrl: './mission-management.component.html',
    styleUrls: ['./mission-management.component.css']
})
export class MissionManagementComponent implements OnInit {
    selectedId: number;

    constructor(private missionService: MissionService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('missionId')) {
                this.selectedId = parseInt(params.get('missionId'));
            }
        });
        this.missionService.eventsByType(EVENT.DELETE)
            .filter((mission) => this.selectedId && mission.id === this.selectedId)
            .subscribe(() => this.selectedId = undefined);
    }

    showDetails(mission: Mission) {
        this.selectedId = mission.id;
    }

    @HostListener('body:click', ['$event'])
    cancelSelection(event: MouseEvent) {
        this.selectedId = undefined;
    }
}
