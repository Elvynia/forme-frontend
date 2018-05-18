import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mission } from './mission';
import { EntityService } from './core/entity.service';
import { AuthService } from './core/auth.service';

@Injectable()
export class MissionService extends EntityService<Mission> {

  constructor(httpClient: HttpClient, authService: AuthService) {
  	super();
  	this.apiPath += '/mission';
  	this.httpClient = httpClient;
  	this.authService = authService;
  	this.initialize();
  }

}
