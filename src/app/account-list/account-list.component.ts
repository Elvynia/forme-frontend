import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FormeDataSource } from '../core/forme-data-source';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { AuthService } from '../core/auth.service';
import { EVENT } from '../event';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
	animations: [
	trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
		state('expanded', style({height: '*', visibility: 'visible'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
		])
	]
})
export class AccountListComponent implements OnInit {
	@Input() listTitle: any;
	@Input() filter: (item) => boolean;
	@Input('columns') displayedColumns;
	@Output() onEdit: EventEmitter<Account>;
	dataSource: FormeDataSource<Account>;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	isExpansionDetailRow = (index, row:any) => row.hasOwnProperty('detailRow');
	expandedElement;

	constructor(private accountService: AccountService,
		private authService: AuthService) {
		this.onEdit = new EventEmitter();
		this.displayedColumns = ['id', 'username', 'role', 'actions'];
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.accountService.list()
				.subscribe((data: any) => this.dataSource && this.dataSource.publish(data));
			this.accountService.eventsByType(EVENT.ADD)
				.subscribe((data: any) => this.dataSource && this.dataSource.add(data));
			this.accountService.eventsByType(EVENT.DELETE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id));
			this.accountService.eventsByType(EVENT.UPDATE)
				.subscribe((data: any) => this.dataSource && this.dataSource.update(data.id, data));
		});
		this.dataSource = new FormeDataSource(this.paginator, this.sort);
		if (this.filter) {
			this.dataSource.filter = this.filter;
		}
	}

	handleExpanded(event, row: any) {
		if (this.expandedElement && this.expandedElement == row) {
			this.expandedElement = null;
		} else {
			this.expandedElement = row;
		}
	}

	editAccount(account: Account) {
		this.onEdit.next(account);
	}

	deleteAccount(account: Account) {
		this.accountService.delete(account);
	}

}
