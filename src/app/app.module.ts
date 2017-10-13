import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'angular-calendar';

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

import { ROUTES } from './routes';
import { CompanyRefComponent } from './company-ref/company-ref.component';
import { MissionEditComponent } from './mission-edit/mission-edit.component';
import { LayoutListComponent } from './layout-list/layout-list.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';
import { AgendaComponent } from './agenda/agenda.component';
import { PlanningComponent } from './planning/planning.component';
import { EventEditComponent } from './event-edit/event-edit.component';

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
    LayoutListComponent,
    MissionListComponent,
    CompanyListComponent,
    EditToolbarComponent,
    AgendaComponent,
    PlanningComponent,
    EventEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    CalendarModule.forRoot()
  ],
  providers: [InvoiceService, EstimateService, CompanyService, MissionService, MessageService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
