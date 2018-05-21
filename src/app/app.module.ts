import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';

import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { EstimateListComponent } from './estimate-list/estimate-list.component';
import { EstimateEditComponent } from './estimate-edit/estimate-edit.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

import { InvoiceService } from './invoice.service';
import { EstimateService } from './estimate.service';
import { CompanyService } from './company.service';
import { MissionService } from './mission.service';
import { EventService } from './event.service';
import { AuthGuard, AuthService, Account } from './core';

import { ROUTES } from './routes';
import { CompanyRefComponent } from './company-ref/company-ref.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { PlanningComponent } from './planning/planning.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { InvoiceDocgenComponent } from './invoice-docgen/invoice-docgen.component';
import { CompanyComboboxComponent } from './company-combobox/company-combobox.component';
import { MissionComboboxComponent } from './mission-combobox/mission-combobox.component';
import { CoreModule } from './core/core.module';
import { InvoiceManagementComponent } from './invoice-management/invoice-management.component';

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
    InvoiceManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    CalendarModule.forRoot(),
    AppMaterialModule,
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
