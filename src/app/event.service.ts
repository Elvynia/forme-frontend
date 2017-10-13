import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MissionEvent } from './mission-event';
import { BaseService } from './base.service';

@Injectable()
export class EventService extends BaseService<MissionEvent> {

	constructor(HttpClient: HttpClient) {
		super();
		this.httpClient = HttpClient;
		this.apiPath += '/event';
	}

	listByMission(missionId: number) {
		let params = new HttpParams();
		params.set('missionId', missionId.toString());
		this.httpClient.get(this.apiPath + '/', {
			params: params
		});
	}

}
