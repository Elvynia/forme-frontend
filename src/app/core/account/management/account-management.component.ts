import { Component, OnInit, HostListener } from '@angular/core';

import { Account } from '../account';
import { EVENT} from '../../event';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'account-management',
	templateUrl: './account-management.component.html',
    styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent {
	selectedId: number;

    constructor(private accountService: AccountService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParamMap.subscribe((params) => {
            if (params.has('accountId')) {
                this.selectedId = parseInt(params.get('accountId'));
            }
        });
        this.accountService.eventsByType(EVENT.DELETE)
            .filter((account) => this.selectedId && account.id === this.selectedId)
            .subscribe(() => this.selectedId = undefined);
    }

    showDetails(account: Account) {
        this.selectedId = account.id;
    }

    @HostListener('body:click', ['$event'])
    cancelSelection(event: MouseEvent) {
        this.selectedId = undefined;
    }
}
