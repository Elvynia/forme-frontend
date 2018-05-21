import { Component, Input} from '@angular/core';
import { EntityService } from '../core';
import { MissionService } from '../mission.service';

@Component({
	selector: 'mission-list',
	templateUrl: './mission-list.component.html',
	styleUrls: ['./mission-list.component.css'],
	providers: [
		{ provide: EntityService, useExisting: MissionService }
	]
})
export class MissionListComponent {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input() filterContext: any;
	@Input('columns') displayedColumns;

	constructor() {
		this.listTitle = 'Toutes les missions';
		this.displayedColumns = ['id', 'client', 'label', 'title', 'type', 'duration', 'tjm', 'travelCosts', 'closed'];
	}
}
