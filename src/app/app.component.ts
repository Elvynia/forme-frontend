import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	wideScreen: boolean;

	constructor(private router: Router) {
		this.wideScreen = false;
	}
  
  ngOnInit() {
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
  }
}
