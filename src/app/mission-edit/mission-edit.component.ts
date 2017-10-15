import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Mission } from '../mission';
import { MissionService } from '../mission.service';

@Component({
    selector: 'app-mission-edit',
    templateUrl: './mission-edit.component.html',
    styleUrls: ['./mission-edit.component.css']
})
export class MissionEditComponent implements OnInit {
    @Input() mission: Mission;
    @Input() new: boolean;
    companies: Array<Company>;
    durationH: boolean;
    duration: number;

    constructor(private missionService: MissionService,
        private companyService: CompanyService,
        private route: ActivatedRoute) {
        this.new = true;
        this.mission = new Mission();
    }

    ngOnInit() {
        this.companyService.list()
        .subscribe((data: Array<Company>) => {
            this.companies = data;
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.new = false;
                this.missionService.get(parseInt(paramMap.get('id')))
                    .subscribe((mission: Mission) => {
                        this.mission = mission;
                        this.updateDuration();
                    });
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['mission']) {
            this.new = this.mission.id === undefined || this.mission.id === null;
            this.updateDuration();
        }
    }

    submit() {
        this.mission.duration = this.durationH ? this.duration : this.duration * 7;
        if (this.new) {
            this.missionService.create(this.mission);
            this.mission = new Mission();
            this.duration = null;
        } else {
            this.missionService.update(this.mission);
        }
    }

    swapDurationType() {
        this.durationH = !this.durationH;
    }

    private updateDuration() {
        this.duration = this.mission.duration;
        if (!this.durationH) {
            this.duration /= 7;
        }
    }
}
