import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityColumnsDirective, EntityListComponent, EntityCardComponent, EntityEditComponent } from './entity';
import { FieldCheckComponent, FieldDateComponent } from './field';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule } from '@angular/forms';
import { Config } from './config';
import { AccountService } from './account/account.service';
import { AccountAdminComponent } from './account/admin/account-admin.component';
import { AccountEditComponent } from './account/edit/account-edit.component';
import { AccountListComponent } from './account/list/account-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-gard';
import { AuthService } from './auth/auth.service';
import { Account } from './account/account';

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
        FieldDateComponent,
        AccountAdminComponent,
        AccountEditComponent,
        AccountListComponent,
        LoginComponent
    ],
    exports: [
        EntityListComponent,
        EntityColumnsDirective,
        EntityCardComponent,
        EntityEditComponent,
        FieldCheckComponent,
        FieldDateComponent,
        AccountAdminComponent,
        AccountEditComponent,
        AccountListComponent,
        LoginComponent
    ]
})
export class CoreModule {

    public static forRoot(config: Config): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: Config, useValue: config },
                AccountService,
                AuthGuard,
                AuthService,
                Account
            ]
        };
    }
}
