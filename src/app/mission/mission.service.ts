import { Injectable } from '@angular/core';

import { Mission } from './mission';
import { EntityService } from '../core';
import { Company } from '../company/company';

@Injectable()
export class MissionService extends EntityService<Mission> {
	
	protected initialize() {
		this.apiPath += '/mission';
		super.initialize();
	}

	getNew(): Mission {
		return new Mission();
	}

	exportData(data: Array<Mission>): Array<any> {
		return data.map((m) => <any>{
			id: m.id,
			client: m.client.name,
			duration: m.duration,
			tjm: m.tjm,
			label: m.label,
			title: m.title,
			place: m.place,
			travelCosts: m.travelCosts,
			type: m.type,
			closed: m.closed
		});
	}


	importData(data: Array<any>) {
		let missions: Array<Mission> = data.map((obj) => {
			let mission = new Mission();
			mission.client = new Company();
			mission.client.id = obj.clientId;
			mission.duration = obj.duration;
			mission.label = obj.label;
			mission.place = obj.place;
			mission.title = obj.title;
			mission.tjm = obj.tjm;
			mission.travelCosts = obj.travelCosts;
			mission.type = obj.type;
			mission.client = obj.closed;
			return mission;
		});
		super.importData(missions);
	}

}
