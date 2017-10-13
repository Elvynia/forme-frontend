import { MissionEvent } from './mission-event';

import * as moment from 'moment';

export class Calendar {
	events: Array<MissionEvent>;
	viewDate: Date;

	public get month(): number {
		return moment(this.viewDate).month();
	}

	public get strMonth(): string {
		return moment(this.viewDate).format('MMMM');
	}

	constructor(viewDate: Date, events?: Array<MissionEvent>) {
		this.events = events;
		this.viewDate = viewDate;
	}
}
