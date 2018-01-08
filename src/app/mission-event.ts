import { Entity } from './entity';

import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { Company } from './company';

export class MissionEvent implements Entity {
	id: number;
	mdStart: moment.Moment;
	mdEnd: moment.Moment;
	mission: Company;
	color: any;
	missionLabel?: Observable<string>;

	static build(event: any): MissionEvent {
		let instance: MissionEvent = new MissionEvent();
		if (event) {
			instance.start = event.start;
			instance.end = event.end;
			instance.id = event.id;
			instance.mission = event.mission;
		}
		return instance;
	}

	constructor(id?: number) {
		this.id = id;
		this.buildColor('#71B340', '#3C5A14');
		this.mdStart = moment();
		this.mdEnd = moment();
	}

	public buildColor(primary: string, secondary: string) {
		this.color = {
			primary: primary,
			secondary: secondary
		};
	}

	public get start() {
		return this.mdStart ? this.mdStart.valueOf() : undefined;
	}

	public set start(time: number) {
		this.mdStart = moment(time);
	}

	public get end() {
		return this.mdEnd ? this.mdEnd.valueOf() : undefined;
	}

	public set end(time: number) {
		this.mdEnd = moment(time);
	}
}
