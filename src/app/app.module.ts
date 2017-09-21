import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EstimateListComponent } from './estimate-list/estimate-list.component';
import { EstimateEditComponent } from './estimate-edit/estimate-edit.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';

import { InvoiceService } from './invoice.service';
import { EstimateService } from './estimate.service';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    EstimateListComponent,
    EstimateEditComponent,
    InvoiceListComponent,
    InvoiceEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [InvoiceService, EstimateService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
