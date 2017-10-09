import { Route } from '@angular/router';

import { CompanyEditComponent } from './company-edit/company-edit.component';
import { EstimateEditComponent } from './estimate-edit/estimate-edit.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';

export const ROUTES: Array<Route> = [
	{
		path: '',
		component: InvoiceEditComponent
	},
	{
		path: 'company',
		component: CompanyEditComponent
	},
	{
		path: 'estimate',
		component: EstimateEditComponent
	}, {
		path: 'mission',
		component: MissionEditComponent
	}
];