import { Route } from '@angular/router';

import { PlanningComponent } from './planning/planning.component';
import { CompanyManagementComponent } from './company/management/company-management.component';
import { EstimateManagementComponent } from './estimate/management/estimate-management.component';
import { InvoiceManagementComponent } from './invoice/management/invoice-management.component';
import { MissionManagementComponent } from './mission/management/mission-management.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { LoginComponent, AccountManagementComponent } from './core';

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
		path: 'estimate',
		component: EstimateManagementComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'company',
		component: CompanyManagementComponent,
		canActivate: [AuthGuard]
	}, {
		path: 'mission',
		component: MissionManagementComponent,
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
		component: AccountManagementComponent,
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