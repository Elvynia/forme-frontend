import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from './company';
import { BaseService } from './base.service';

@Injectable()
export class CompanyService extends BaseService<Company> {

  constructor(httpClient: HttpClient) {
  	super();
  	this.httpClient = httpClient;
  	this.apiPath += '/company';
  }

}
