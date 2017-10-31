import { Route } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { PlanningComponent } from './planning/planning.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { EstimateEditComponent } from './estimate-edit/estimate-edit.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth-gard';

export const ROUTES: Array<Route> = [
	{
		path: '',
		component: DashboardComponent,
		data: {
			'wideScreen': true
		},
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'invoice',
		component: InvoiceEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'invoice/:id',
		component: InvoiceEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'company',
		component: CompanyEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'company/:id',
		component: CompanyEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'estimate',
		component: EstimateEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'estimate/:id',
		component: EstimateEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'mission',
		component: MissionEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'mission/:id',
		component: MissionEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'event',
		component: EventEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'event/:id',
		component: EventEditComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'agenda',
		component: AgendaComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'planning',
		component: PlanningComponent,
		data: {
			'wideScreen': true
		},
		canActivate: [AuthGuard]
	}
];