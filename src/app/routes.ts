import { Route } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { PlanningComponent } from './planning/planning.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { EstimateEditComponent } from './estimate-edit/estimate-edit.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { EventEditComponent } from './event-edit/event-edit.component';

export const ROUTES: Array<Route> = [
	{
		path: 'invoice',
		component: InvoiceEditComponent
	}, {
		path: 'invoice/:id',
		component: InvoiceEditComponent
	}, {
		path: 'company',
		component: CompanyEditComponent
	}, {
		path: 'company/:id',
		component: CompanyEditComponent
	}, {
		path: 'estimate',
		component: EstimateEditComponent
	}, {
		path: 'estimate/:id',
		component: EstimateEditComponent
	}, {
		path: 'mission',
		component: MissionEditComponent
	}, {
		path: 'mission/:id',
		component: MissionEditComponent
	}, {
		path: 'event',
		component: EventEditComponent
	}, {
		path: 'event/:id',
		component: EventEditComponent
	}, {
		path: 'agenda',
		component: AgendaComponent,
		data: {
			'wideScreen': false
		}
	}, {
		path: 'planning',
		component: PlanningComponent,
		data: {
			'wideScreen': true
		}
	}
];