import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityListComponent } from './entity-list/entity-list.component';
import { AppMaterialModule } from '../app-material.module';
import { EntityColumnsDirective } from './entity-columns.directive';

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    declarations: [
        EntityListComponent,
        EntityColumnsDirective
    ],
    exports: [
        EntityListComponent,
        EntityColumnsDirective
    ]
})
export class CoreModule { }
