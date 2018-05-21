import { Component, Input } from '@angular/core';

import { MissionService } from '../mission.service';
import { EntityService } from '../../core';

@Component({
    selector: 'mission-edit',
    templateUrl: './mission-edit.component.html',
    styleUrls: ['./mission-edit.component.css'],
	providers: [
		{ provide: EntityService, useExisting: MissionService }
	]
})
export class MissionEditComponent {
    private durationH: boolean;
    @Input() id: number;

    constructor() {
        this.durationH = true;
    }

}
