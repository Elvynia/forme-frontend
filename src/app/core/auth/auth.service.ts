import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { Account } from '../account/account';
import { Config } from '../config';

export const LSK_ACCOUNT = 'account';

@Injectable()
export class AuthService {
	private subject: BehaviorSubject<Account>;

	private get storageAccount(): Account {
		return this.account.clone(JSON.parse(localStorage.getItem(LSK_ACCOUNT)));
	}

	public get accounts(): Observable<Account> {
		return this.subject.asObservable();
	}

	public get loggedIn(): Observable<Account> {
		return this.accounts.filter((account: Account) => account != null);
	}

	public get loggedOut(): Observable<Account> {
		return this.accounts.filter((account: Account) => account == null);
	}

	constructor(private httpClient: HttpClient, private config: Config, private account: Account) {
		this.subject = new BehaviorSubject(this.check() ? this.storageAccount : null);
		this.subject.subscribe((account: Account) => {
			if (account) {
				localStorage.setItem(LSK_ACCOUNT, JSON.stringify(account));
			} else {
				localStorage.removeItem(LSK_ACCOUNT);
			}
		});
	}

	login(user: Account): Observable<Account> {
		this.httpClient.post(this.config.loginUrl, user)
			.subscribe((account: Account) => {
				this.subject.next(this.account.clone(account));
			});
			return this.accounts;
	}

	check(): boolean {
		return localStorage.getItem(LSK_ACCOUNT) && localStorage.getItem(LSK_ACCOUNT).length > 0;
	}

	logout(): Observable<Account> {
		this.subject.next(null);
		return this.accounts;
	}
}
