import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list/entity-list.component';
import { AppMaterialModule } from '../app-material.module';
import { EntityColumnsDirective } from './entity-columns.directive';
import { FieldCheckComponent } from './field-check/field-check.component';
import { EntityCardComponent } from './entity-card/entity-card.component';
import { EntityEditComponent } from './entity-edit/entity-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppMaterialModule
    ],
    declarations: [
        EntityListComponent,
        EntityColumnsDirective,
        FieldCheckComponent,
        EntityCardComponent,
        EntityEditComponent
    ],
    exports: [
        EntityListComponent,
        EntityColumnsDirective,
        FieldCheckComponent,
        EntityCardComponent,
        EntityEditComponent
    ]
})
export class CoreModule { }
