import { Entity } from './entity';

import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { Company } from './company';

export class MissionEvent implements Entity {
	id: number;
	start: Date;
	end: Date;
	mission: Company;
	color: any;
	missionLabel?: Observable<string>;

	static build(event: any): MissionEvent {
		let instance: MissionEvent = new MissionEvent();
		if (event) {
			if (event.start) {
				instance.start = event.start;
			}
			if (event.end) {
				instance.end = event.end;
			}
			instance.id = event.id;
			instance.mission = event.mission;
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
