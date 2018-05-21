import { Component, Input } from '@angular/core';

import { Estimate } from '../estimate';
import { EstimateService } from '../estimate.service';
import { EntityService } from '../../core';

@Component({
	selector: 'estimate-details',
	templateUrl: './estimate-details.component.html',
	styleUrls: ['./estimate-details.component.css'],
	providers: [
		{ provide: EntityService, useExisting: EstimateService }
	]
})
export class EstimateDetailsComponent {
	@Input() id: number;

}
