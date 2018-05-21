import { Component, Input } from '@angular/core';

import { Mission } from '../mission';
import { MissionService } from '../mission.service';
import { EntityService } from '../../core';

@Component({
	selector: 'mission-details',
	templateUrl: './mission-details.component.html',
	styleUrls: ['./mission-details.component.css'],
	providers: [
		{ provide: EntityService, useExisting: MissionService }
	]
})
export class MissionDetailsComponent {
	@Input() id: number;

}
