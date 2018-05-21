import { Component, OnInit } from '@angular/core';

import { Account } from '../account';

@Component({
	selector: 'account-admin',
	templateUrl: './account-admin.component.html',
	styleUrls: ['./account-admin.component.css']
})
export class AccountAdminComponent implements OnInit {
	account: Account;
	editing: boolean;

	constructor() {
		this.updateEdit();
	}

	ngOnInit() {
	}

	startEdit(account: Account) {
		this.updateEdit(account);
	}

	endEdit() {
		this.updateEdit();
	}

	private updateEdit(account?: Account) {
		this.account = account.clone(account);
		this.editing = account ? true : false;
	}

}
