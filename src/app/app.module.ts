import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { AuthService } from './auth.service';

import { AuthGuard } from './auth-gard';

import { ROUTES } from './routes';
import { CompanyRefComponent } from './company-ref/company-ref.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';
import { AgendaComponent } from './agenda/agenda.component';
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
    AgendaComponent,
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
    StatusFieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    CalendarModule.forRoot(),
    AppMaterialModule
  ],
  providers: [InvoiceService, EstimateService, CompanyService, MissionService, 
    MessageService, EventService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
