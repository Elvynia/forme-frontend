import { Component, Input} from '@angular/core';
import { CompanyService } from '../company.service';
import { EntityService } from '../core/entity.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [
	  { provide: EntityService, useExisting: CompanyService }
  ]
})
export class CompanyListComponent {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input() filterContext: any;
	@Input('columns') displayedColumns;

	constructor() {
		this.listTitle = 'Toutes les sociétés';
		this.displayedColumns = ['id', 'trigram', 'name', 'siren', 'siret', 'rcs', 'address'];
	}

}
