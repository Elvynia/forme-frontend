import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list/entity-list.component';
import { AppMaterialModule } from '../app-material.module';
import { EntityColumnsDirective } from './entity-columns.directive';
import { FieldCheckComponent } from './field-check/field-check.component';
import { EntityCardComponent } from './entity-card/entity-card.component';

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    declarations: [
        EntityListComponent,
        EntityColumnsDirective,
        FieldCheckComponent,
        EntityCardComponent
    ],
    exports: [
        EntityListComponent,
        EntityColumnsDirective,
        FieldCheckComponent,
        EntityCardComponent
    ]
})
export class CoreModule { }
