import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Account } from '../account';
import { AccountService } from '../account.service';
import { EntityService } from '../core';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  providers: [
	  { provide: EntityService, useExisting: AccountService }
  ]
})
export class AccountListComponent {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input() filterContext: any;
	@Input('columns') displayedColumns;
	@Output() onEdit: EventEmitter<Account>;

	constructor(private accountService: AccountService) {
		this.onEdit = new EventEmitter();
		this.listTitle = 'Tous les comptes';
		this.displayedColumns = ['id', 'username', 'role', 'actions'];
	}

	editAccount(account: Account) {
		this.onEdit.next(account);
	}

	deleteAccount(account: Account) {
		this.accountService.delete(account);
	}

}
