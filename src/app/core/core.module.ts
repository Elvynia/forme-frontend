import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityColumnsDirective, EntityListComponent, EntityCardComponent, EntityEditComponent } from './entity';
import { FieldCheckComponent, FieldDateComponent } from './field';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule } from '@angular/forms';
import { Config } from './config';

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
export class CoreModule {

    public static forRoot(apiUrl: string, loginUrl: string): ModuleWithProviders {
        let config = new Config();
        config.apiUrl = apiUrl;
        config.loginUrl = loginUrl;
        return {
            ngModule: CoreModule,
            providers: [
                { provide: Config, useValue: config }
            ]
        };
    }
}
