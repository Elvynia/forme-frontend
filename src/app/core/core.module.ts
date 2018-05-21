import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityColumnsDirective, EntityListComponent, EntityCardComponent, EntityEditComponent } from './entity';
import { FieldCheckComponent, FieldDateComponent } from './field';
import { AppMaterialModule } from '../app-material.module';
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
        EntityCardComponent,
        EntityEditComponent,
        FieldCheckComponent,
        FieldDateComponent
    ],
    exports: [
        EntityListComponent,
        EntityColumnsDirective,
        EntityCardComponent,
        EntityEditComponent,
        FieldCheckComponent,
        FieldDateComponent
    ]
})
export class CoreModule { }
