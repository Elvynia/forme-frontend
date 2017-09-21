import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Invoice } from './invoice';

@Injectable()
export class InvoiceService {

  constructor() { }

  create(invoice: Invoice): Observable<Invoice> {
  	return Observable.of(new Invoice(Math.random()));
  }

  list(): Observable<Array<Invoice>> {
  	return Observable.of([
  		new Invoice(1),
  		new Invoice(2),
  		new Invoice(3),
  		new Invoice(4),
  		new Invoice(5),
  		new Invoice(6)
  		]);
  }
}
