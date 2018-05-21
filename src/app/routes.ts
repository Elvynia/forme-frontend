import { Route } from '@angular/router';

import { PlanningComponent } from './planning/planning.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { EstimateEditComponent } from './estimate-edit/estimate-edit.component';
import { InvoiceManagementComponent } from './invoice/management/invoice-management.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { LoginComponent, AccountAdminComponent } from './core';

import { AuthGuard } from './core';

export const ROUTES: Array<Route> = [
	{
		path: 'dashboard',
		data: {
			'wideScreen': true
		},
		children: [{
			path: 'default',
			component: DashboardComponent
		}, {
			path: 'overview',
			component: AdminDashboardComponent
		}, {
			path: 'clientboard',
			component: ClientDashboardComponent
		}]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'invoice',
		component: InvoiceManagementComponent,
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
		path: 'account',
		component: AccountAdminComponent,
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