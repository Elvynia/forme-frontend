import { Component, OnInit } from '@angular/core';
import { Router } from 	'@angular/router';

import { Mission } from '../mission';
import { MissionService } from '../mission.service';
import { EVENT } from '../event';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {
	data: any[];

	constructor(private missionService: MissionService,
		private router: Router) {
	}

	ngOnInit() {
		this.missionService.list()
			.subscribe((data: any) => this.data = data);
		this.missionService.eventsByType(EVENT.ADD)
			.subscribe((data: any) => this.data.push(data));
		this.missionService.eventsByType(EVENT.DELETE)
			.subscribe((data: any) => this.update(data.id));
		this.missionService.eventsByType(EVENT.UPDATE)
			.subscribe((data: any) => this.update(data.id, data));
	}

	private update(id: number, mission?: Mission) {
		let index = this.data.findIndex((search) => search.id === id);
		if (index && index >= 0) {
			if (mission) {
				this.data.splice(index, 1, mission);
			} else {
				this.data.splice(index, 1);
			}
			this.data = this.data.slice();
		}
	}

	modifySelected(selected: any[]) {
		if (selected && selected[0]) {
			this.router.navigate(['/mission/', selected[0].id]);
		}
	}

	deleteSelected(selected: any[]) {
		if (selected) {
			selected.forEach((mission: Mission) => {
				this.missionService.delete(mission);
			});
		}
	}

}
