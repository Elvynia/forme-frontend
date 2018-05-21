import { Component, Input } from '@angular/core';

import { EntityService, ListColumn, FormeDataSource } from '../core';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';

@Component({
  selector: 'estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css'],
  providers: [
	  { provide: EntityService, useExisting: EstimateService}
  ]
})
export class EstimateListComponent {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input() filterContext: any;
	@Input('columns') displayedColumns;

	constructor() {
		this.listTitle = 'Tous les devis';
		this.displayedColumns = ['id', 'client', 'amount', 'date', 'signed'];
	}
	
}
