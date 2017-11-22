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

    submit(form) {
        this.mission.duration = this.durationH ? this.duration : this.duration * 7;
        if (this.new) {
            this.missionService.create(this.mission);
        } else {
            this.missionService.update(this.mission);
        }
        this.duration = null;
        form.resetForm(new Mission());
    }

    swapDurationType() {
        this.durationH = !this.durationH;
        if (this.durationH) {
            this.duration *= 7;
        } else {
            this.duration /= 7;
        }
    }

    private updateDuration() {
        this.duration = this.mission.duration;
        if (!this.durationH) {
            this.duration /= 7;
        }
    }
}
