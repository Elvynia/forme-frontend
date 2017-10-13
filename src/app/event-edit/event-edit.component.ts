import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Mission } from '../mission';
import { MissionEvent } from '../mission-event';
import { EventService } from '../event.service';
import { MissionService } from '../mission.service';

@Component({
	selector: 'app-event-edit',
	templateUrl: './event-edit.component.html',
	styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, OnChanges {
	@Input() event: MissionEvent;
	@Input() new: boolean;
	missions: Array<Mission>;

	constructor(private eventService: EventService,
		private missionService: MissionService,
		private route: ActivatedRoute) {
		this.new = true;
		this.event = new MissionEvent();
	}

	ngOnInit() {
		this.missionService.list()
			.subscribe((missions: Array<Mission>) => 
				this.missions = missions);
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.new = false;
                this.eventService.get(parseInt(paramMap.get('id')))
                .subscribe((event: MissionEvent) => this.event = MissionEvent.build(event));
            }
        });
	}

	ngOnChanges(changes: SimpleChanges) {
        if (changes['event']) {
            this.new = this.event.id === undefined || this.event.id === null;
        }
    }

	submit() {
		if (this.new) {
			this.eventService.create(this.event);
		} else {
			this.eventService.update(this.event);
		}
		this.event = new MissionEvent();
	}

}
