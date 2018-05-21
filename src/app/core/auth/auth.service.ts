import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { Account } from './../../account';
import { environment as ENV } from '../../../environments/environment';

export const LSK_ACCOUNT = 'account';

@Injectable()
export class AuthService {
	private _account: BehaviorSubject<Account>;

	private get storageAccount(): Account {
		return JSON.parse(localStorage.getItem(LSK_ACCOUNT));
	}

	public get accounts(): Observable<Account> {
		return this._account.asObservable();
	}

	public get loggedIn(): Observable<Account> {
		return this.accounts.filter((account: Account) => account != null);
	}

	public get loggedOut(): Observable<Account> {
		return this.accounts.filter((account: Account) => account == null);
	}

	constructor(private httpClient: HttpClient) {
		this._account = new BehaviorSubject(this.check() ? this.storageAccount : null);
		this._account.subscribe((account: Account) => {
			if (account) {
				localStorage.setItem(LSK_ACCOUNT, JSON.stringify(account));
			} else {
				localStorage.removeItem(LSK_ACCOUNT);
			}
		});
	}

	login(user: Account): Observable<Account> {
		this.httpClient.post(ENV.loginUrl, user)
			.subscribe((account: Account) => {
				this._account.next(account);
			});
			return this.accounts;
	}

	check(): boolean {
		return localStorage.getItem(LSK_ACCOUNT) && localStorage.getItem(LSK_ACCOUNT).length > 0;
	}

	logout(): Observable<Account> {
		this._account.next(null);
		return this.accounts;
	}
}
