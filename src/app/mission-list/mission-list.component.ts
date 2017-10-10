import { Component, OnInit } from '@angular/core';

import { MissionService } from '../mission.service';
import { EVENT } from '../event';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {
	data: any[];

	constructor(private missionService: MissionService) {
	}

	ngOnInit() {
		this.missionService.list()
			.subscribe((data: any) => this.data = data);
		this.missionService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => this.data.push(data));
	}

}
