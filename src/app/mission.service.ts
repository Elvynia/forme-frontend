import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mission } from './mission';
import { BaseService } from './base.service';

@Injectable()
export class MissionService extends BaseService<Mission> {

  constructor(httpClient: HttpClient) {
  	super();
  	this.apiPath += '/mission';
  	this.httpClient = httpClient;
  }

}
