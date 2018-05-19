import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list/entity-list.component';
import { AppMaterialModule } from '../app-material.module';
import { EntityColumnsDirective } from './entity-columns.directive';
import { FieldCheckComponent } from './field-check/field-check.component';

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    declarations: [
        EntityListComponent,
        EntityColumnsDirective,
        FieldCheckComponent
    ],
    exports: [
        EntityListComponent,
        EntityColumnsDirective,
        FieldCheckComponent
    ]
})
export class CoreModule { }
