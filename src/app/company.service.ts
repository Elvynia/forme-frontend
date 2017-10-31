import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from './company';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

@Injectable()
export class CompanyService extends BaseService<Company> {

  constructor(httpClient: HttpClient, authService: AuthService) {
  	super();
  	this.httpClient = httpClient;
  	this.authService = authService;
  	this.apiPath += '/company';
  	this.initialize();
  }

}
