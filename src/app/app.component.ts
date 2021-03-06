import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService, AccountService } from './core';
import { FormeAccount } from './forme-account';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	wideScreen: boolean;
	isDashboard: boolean;
	isClientboard: boolean;
	account: FormeAccount;
	clients: Array<FormeAccount>;

	public get loggedIn(): boolean {
		return this.account != null;
	}

	constructor(private router: Router,
		private authService: AuthService,
		private accountService: AccountService,
		private iconService: MatIconRegistry,
		private domSanitizer: DomSanitizer) {
		this.wideScreen = false;
		this.isDashboard = false;
		this.isClientboard = false;
		this.account = null;
	}

	ngOnInit() {
		this.authService.loggedIn.subscribe(() => {
			this.accountService.list()
			.map((accounts: FormeAccount[]) => 
				accounts.filter((account: FormeAccount) => account.isClient))
			.subscribe((accounts) =>
				this.clients = accounts);
		});
		this.registerIcons();
		this.router.events
		.filter(event => event instanceof NavigationEnd)
		.map(_ => this.router.routerState.root)
		.map(route => {
			while (route.firstChild) route = route.firstChild;
			return route;
		})
		.flatMap((route: ActivatedRoute) => route.data)
		.subscribe((data:any) => {
			this.wideScreen = data.wideScreen;
		});
		this.router.events
		.filter((event) => event instanceof NavigationEnd)
		.subscribe((event: NavigationEnd) => {
			this.isDashboard = event.url.indexOf('/dashboard') === 0;
			this.isClientboard = event.url.indexOf('/dashboard/clientboard') === 0;
			if (event.url === '/dashboard' && this.account) {
				this.router.navigate(['dashboard', this.account.isAdmin ?
					'overview' : this.account.isClient ? 'clientboard' : 'default']);
			}
		});
		this.authService.accounts.subscribe((account: any) => {
			this.account = account ? account : null;
		});
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['login']);
	}

	private registerIcons() {
		let icons = [ 'company', 'estimate', 'mission', 'invoice', 'brand_1'];
		for (let icon of icons) {
			this.iconService.addSvgIcon(icon, 
				this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/' + icon + '.svg'));
		}
	}
}
