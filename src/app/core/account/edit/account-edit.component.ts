import { Component, Input } from '@angular/core';

import { AccountService } from '../account.service';
import { EntityService } from '../../entity/entity.service';

@Component({
	selector: 'account-edit',
	templateUrl: './account-edit.component.html',
	styleUrls: ['./account-edit.component.css'],
    providers: [
        { provide: EntityService, useExisting: AccountService }
    ]
})
export class AccountEditComponent {
	@Input() id: number;

}
