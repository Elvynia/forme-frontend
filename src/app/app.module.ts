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
import { MessageService } from './message.service';
import { EventService } from './event.service';
import { AccountService } from './account.service';
import { AuthService } from './core/auth.service';
import { RoleService } from './role.service';

import { AuthGuard } from './auth-gard';

import { ROUTES } from './routes';
import { CompanyRefComponent } from './company-ref/company-ref.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';
import { PlanningComponent } from './planning/planning.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { StatusFieldComponent } from './status-field/status-field.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { InvoiceDocgenComponent } from './invoice-docgen/invoice-docgen.component';
import { CompanyComboboxComponent } from './company-combobox/company-combobox.component';
import { MissionComboboxComponent } from './mission-combobox/mission-combobox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CoreModule } from './core/core.module';
import { InvoiceManagementComponent } from './invoice-management/invoice-management.component';

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
    EditToolbarComponent,
    PlanningComponent,
    EventEditComponent,
    LoginComponent,
    DashboardComponent,
    AdminDashboardComponent,
    ClientDashboardComponent,
    InvoiceDetailsComponent,
    MissionDetailsComponent,
    EstimateDetailsComponent,
    CompanyDetailsComponent,
    StatusFieldComponent,
    AccountListComponent,
    AccountEditComponent,
    AccountAdminComponent,
    InvoiceDocgenComponent,
    CompanyComboboxComponent,
    MissionComboboxComponent,
    DatepickerComponent,
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
    CoreModule
  ],
  providers: [InvoiceService, EstimateService, CompanyService, MissionService, 
    MessageService, EventService, AccountService, AuthService, AuthGuard, RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
