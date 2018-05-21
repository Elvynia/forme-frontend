import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';

import { EstimateDetailsComponent } from './estimate/details/estimate-details.component';
import { EstimateEditComponent } from './estimate/edit/estimate-edit.component';
import { EstimateListComponent } from './estimate/list/estimate-list.component';
import { EstimateManagementComponent } from './estimate/management/estimate-management.component';
import { EstimateService } from './estimate/estimate.service';

import { InvoiceDetailsComponent } from './invoice/details/invoice-details.component';
import { InvoiceDocgenComponent } from './invoice/docgen/invoice-docgen.component';
import { InvoiceEditComponent } from './invoice/edit/invoice-edit.component';
import { InvoiceListComponent } from './invoice/list/invoice-list.component';
import { InvoiceManagementComponent } from './invoice/management/invoice-management.component';
import { InvoiceService } from './invoice/invoice.service';

import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyComboboxComponent } from './company-combobox/company-combobox.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyService } from './company.service';

import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { MissionComboboxComponent } from './mission-combobox/mission-combobox.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionService } from './mission.service';

import { EventService } from './event.service';
import { CoreModule, AuthGuard, AuthService, Account } from './core';

import { ROUTES } from './routes';
import { CompanyRefComponent } from './company-ref/company-ref.component';
import { PlanningComponent } from './planning/planning.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';

import { environment as ENV } from '../environments/environment';
import { FormeAccount } from './forme-account';

@NgModule({
  declarations: [
    AppComponent,
    EstimateListComponent,
    EstimateEditComponent,
    InvoiceListComponent,
    InvoiceEditComponent,
    CompanyEditComponent,
    CompanyRefComponent,
    MissionEditComponent,
    MissionListComponent,
    CompanyListComponent,
    PlanningComponent,
    EventEditComponent,
    DashboardComponent,
    AdminDashboardComponent,
    ClientDashboardComponent,
    InvoiceDetailsComponent,
    MissionDetailsComponent,
    EstimateDetailsComponent,
    CompanyDetailsComponent,
    InvoiceDocgenComponent,
    CompanyComboboxComponent,
    MissionComboboxComponent,
    InvoiceManagementComponent,
    EstimateManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    CalendarModule.forRoot(),
    CoreModule.forRoot({ apiUrl: ENV.apiUrl, loginUrl: ENV.loginUrl }),
  ],
  providers: [
    InvoiceService,
    EstimateService,
    CompanyService,
    MissionService, 
    EventService,
    { provide: Account, useClass: FormeAccount }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
