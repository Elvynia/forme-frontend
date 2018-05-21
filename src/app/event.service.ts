import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MissionEvent } from './mission-event';
import { EntityService, AuthService } from './core';

@Injectable()
export class EventService extends EntityService<MissionEvent> {

	constructor(HttpClient: HttpClient, authService: AuthService) {
		super();
		this.httpClient = HttpClient;
		this.authService = authService;
		this.apiPath += '/event';
		this.initialize();
	}

	getNew(): MissionEvent {
		return new MissionEvent();
	}

	listByMission(missionId: number) {
		let params = new HttpParams();
		params.set('missionId', missionId.toString());
		this.httpClient.get(this.apiPath + '/', {
			params: params
		});
	}

}
