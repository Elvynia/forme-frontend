import { Entity } from './entity';

import * as moment from 'moment';

export class MissionEvent implements Entity {
	id: number;
	start: string;
	end: string;
	missionId: number;
	color: any;

	static build(event: any): MissionEvent {
		let instance: MissionEvent = new MissionEvent();
		if (instance) {
			instance.start = event.start;
			instance.end = event.end;
			instance.id = event.id;
			instance.missionId = event.missionId;
		}
		return instance;
	}

	public get startValue() {
		if (!this.start) {
			this.start = moment().format();
		}
		return moment(this.start).format('YYYY-MM-DD');
	}

	public get endValue() {
		if (!this.end) {
			this.end = moment().format();
		}
		return moment(this.end).format('YYYY-MM-DD');
	}

	public set startValue(start: any) {
		console.log('setting start value with %s', start);
		this.start = start;
	}

	public set endValue(end: any) {
		console.log('setting start value with %s', end);
		this.end = end;
	}

	constructor(id?: number) {
		this.id = id;
		this.buildColor('#71B340', '#3C5A14');
	}

	public buildColor(primary: string, secondary: string) {
		this.color = {
			primary: primary,
			secondary: secondary
		};
	}

}
