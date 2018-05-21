import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CompanyService } from '../company.service';
import { EntityService } from '../../core';
import { Company } from '../company';

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

	@Output() onSelect: EventEmitter<Company>;

	constructor() {
		this.listTitle = 'Toutes les sociétés';
		this.displayedColumns = ['id', 'trigram', 'name', 'siren', 'siret', 'rcs', 'address'];
		this.onSelect = new EventEmitter();
	}

	select(invoice: Company) {
		this.onSelect.next(invoice);
	}

}
