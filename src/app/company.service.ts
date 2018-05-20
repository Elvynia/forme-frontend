import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from './company';
import { EntityService } from './core/entity.service';
import { AuthService } from './core/auth.service';

@Injectable()
export class CompanyService extends EntityService<Company> {

  constructor(httpClient: HttpClient, authService: AuthService) {
  	super();
  	this.httpClient = httpClient;
  	this.authService = authService;
  	this.apiPath += '/company';
  	this.initialize();
  }

  getNew(): Company {
	  return new Company();
  }

}
