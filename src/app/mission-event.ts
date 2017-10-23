import { Entity } from './entity';

import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

export class MissionEvent implements Entity {
	id: number;
	start: Date;
	end: Date;
	missionId: number;
	color: any;
	missionLabel?: Observable<string>;

	static build(event: any): MissionEvent {
		let instance: MissionEvent = new MissionEvent();
		if (instance) {
			if (event.start) {
				instance.start = event.start;
			}
			if (event.end) {
				instance.end = event.end;
			}
			instance.id = event.id;
			instance.missionId = event.missionId;
		}
		return instance;
	}

	constructor(id?: number, initDates: boolean = true) {
		this.id = id;
		this.buildColor('#71B340', '#3C5A14');
		if (initDates) {
			this.start = new Date();
			this.end = new Date();
		}
	}

	public buildColor(primary: string, secondary: string) {
		this.color = {
			primary: primary,
			secondary: secondary
		};
	}

}
