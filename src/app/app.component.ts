import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	wideScreen: boolean;
    loggedIn: boolean;

    constructor(private router: Router,
        private authService: AuthService,
        private iconService: MatIconRegistry,
        private domSanitizer: DomSanitizer) {
        this.wideScreen = false;
        this.loggedIn = false;
    }

    ngOnInit() {
        this.registerIcons();
        this.router.events
        .filter(event => event instanceof NavigationEnd)
        .map(_ => this.router.routerState.root)
        .map(route => {
            while (route.firstChild) route = route.firstChild;;
            return route;
        })
        .flatMap((route: ActivatedRoute) => route.data)
        .subscribe((data:any) => {
            this.wideScreen = data.wideScreen;
        });
        this.authService.accounts.subscribe((account: any) => {
            if (account) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    private registerIcons() {
        for (let i = 0; i < 3; ++i) {
            this.iconService.addSvgIcon('brand_' + i, this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/brand_' + i + '.svg'));
        }
    }
}
