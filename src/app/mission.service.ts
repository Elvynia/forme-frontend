import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mission } from './mission';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

@Injectable()
export class MissionService extends BaseService<Mission> {

  constructor(httpClient: HttpClient, authService: AuthService) {
  	super();
  	this.apiPath += '/mission';
  	this.httpClient = httpClient;
  	this.authService = authService;
  	this.initialize();
  }

}
