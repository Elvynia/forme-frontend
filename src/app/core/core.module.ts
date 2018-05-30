import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityColumnsDirective, EntityListComponent, EntityCardComponent, EntityEditComponent } from './entity';
import { FieldCheckComponent, FieldDateComponent } from './field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Config } from './config';
import { AccountService } from './account/account.service';
import { AccountManagementComponent } from './account/management/account-management.component';
import { AccountEditComponent } from './account/edit/account-edit.component';
import { AccountListComponent } from './account/list/account-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-gard';
import { AuthService } from './auth/auth.service';
import { Account } from './account/account';
import { CoreMaterialModule } from './core-material.module';
import { RoleService } from './role/role.service';
import { FieldComboboxComponent } from './field/combobox/field-combobox.component';
import { FormeTemplateDirective } from './forme-template.directive';
import { FormeTemplateService } from './forme-template.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreMaterialModule
    ],
    declarations: [
        EntityListComponent,
        FormeTemplateDirective,
        EntityColumnsDirective,
        EntityCardComponent,
        EntityEditComponent,
        FieldCheckComponent,
        FieldDateComponent,
        FieldComboboxComponent,
        AccountManagementComponent,
        AccountEditComponent,
        AccountListComponent,
        LoginComponent
    ],
    exports: [
        // Modules
        CoreMaterialModule,
        // Components
        EntityListComponent,
        EntityCardComponent,
        EntityEditComponent,
        FieldCheckComponent,
        FieldDateComponent,
        FieldComboboxComponent,
        AccountManagementComponent,
        AccountEditComponent,
        AccountListComponent,
        LoginComponent,
        // Directives
        FormeTemplateDirective,
        EntityColumnsDirective
    ]
})
export class CoreModule {

    public static forRoot(config: Config): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: Config, useValue: config },
                FormeTemplateService,
                RoleService,
                AccountService,
                AuthGuard,
                AuthService,
                Account
            ]
        };
    }
}
