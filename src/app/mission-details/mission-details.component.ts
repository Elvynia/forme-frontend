import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Mission } from '../mission';
import { MissionService } from '../mission.service';

@Component({
	selector: 'app-mission-details',
	templateUrl: './mission-details.component.html',
	styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {
	@Input() id: number;
	@Input() hideTitle: boolean;
	mission: Mission;

	constructor(private missionService: MissionService,
		private router: Router) {
		this.hideTitle = false;
	}

	ngOnInit() {
		if (this.id) {
			this.missionService.get(this.id)
				.subscribe((mission: Mission) => this.mission = mission);
		}
	}

	modifySelected() {
		if (this.mission) {
			this.router.navigate(['/mission/', this.mission]);
		}
	}

	deleteSelected() {
		if (this.mission
				&& confirm("Voulez-vous vraiment supprimer cette mission ?")) {
			this.missionService.delete(this.mission);
		}
	}

}
