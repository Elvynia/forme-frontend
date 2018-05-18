import { Component, Input } from '@angular/core';

import { FormeDataSource } from '../core/forme-data-source';
import { Event, EVENT } from '../event';
import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';
import { EntityService } from '../core/entity.service';
import { ListColumn } from '../core/entity-list/entity-list.component';

@Component({
  selector: 'estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css'],
  providers: [
	  { provide: EntityService, useClass: EstimateService}
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
