import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-layout-list',
  templateUrl: './layout-list.component.html',
  styleUrls: ['./layout-list.component.css']
})
export class LayoutListComponent implements OnInit {
	@Input() title: string;
	@Input() filter: (a:any, b:any) => number;
	@Input('limit') _limit: number;
	@Input() data: any[];
	@Input() template: any;
	filteredData: Observable<any[]>;
	limitOn: boolean;
	showMoreLess: boolean;

	get limit(): number {
		return this.limitOn ? this._limit : this.data.length;
	}

	constructor() {
		this._limit = 5;
		this.limitOn = true;
		this.showMoreLess = true;
	}

	ngOnInit() {
		this.refreshLimit();
		this.reloadFilter();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['limit']) {
			this.refreshLimit();
		}
		if (changes['data']) {
			this.reloadFilter();
		}
	}

	public switchLimit() {
		this.limitOn = !this.limitOn;
	}

	private refreshLimit() {
		if (this._limit <= 0) {
			this.showMoreLess = false;
		} else {
			this.showMoreLess = true;
		}
	}

	private reloadFilter() {
		if (this.data) {
			this.filteredData = Observable.of(this.data).map((list) => list.sort(this.filter));
		}
	}
}
