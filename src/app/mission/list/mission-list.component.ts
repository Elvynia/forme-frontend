import { Component, Input, EventEmitter, Output} from '@angular/core';
import { EntityService } from '../../core';
import { MissionService } from '../mission.service';
import { Mission } from '../mission';

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

	@Output() onSelect: EventEmitter<Mission>;

	constructor() {
		this.listTitle = 'Toutes les missions';
		this.displayedColumns = ['id', 'client', 'label', 'title', 'type', 'duration', 'tjm', 'travelCosts', 'closed'];
		this.onSelect = new EventEmitter();
	}

	select(mission: Mission) {
		this.onSelect.next(mission);
	}
}
