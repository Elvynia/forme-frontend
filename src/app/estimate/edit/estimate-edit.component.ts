import { Component, Input } from '@angular/core';

import { EstimateService } from '../estimate.service';
import { EntityService } from '../../core';

@Component({
	selector: 'estimate-edit',
	templateUrl: './estimate-edit.component.html',
	styleUrls: ['./estimate-edit.component.css'],
	providers: [
		{ provide: EntityService, useExisting: EstimateService }
	]
})
export class EstimateEditComponent {
	@Input() id: number;

}
