import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

export type ListDetails = {
	title: string,
	sort: (a:any, b:any) => number,
	filter: (a:any, b:number) => boolean
};

@Component({
  selector: 'app-layout-list',
  templateUrl: './layout-list.component.html',
  styleUrls: ['./layout-list.component.css']
})
export class LayoutListComponent implements OnInit {
	@Input('listTitle') title: string;
	@Input() sort: (a:any, b:any) => number;
	@Input() filter: (a:any, b:number, list?: Array<any>) => boolean;
	@Input('limit') _limit: number;
	@Input() data: any[];
	@Input() template: any;
	@Output() onModify: EventEmitter<any>;
	@Output() onDelete: EventEmitter<any>;
	@Output() onSelection: BehaviorSubject<any>;
	filteredData: Observable<any[]>;
	selectedData: any[];
	limitOn: boolean;
	showMoreLess: boolean;

	get limit(): number {
		return this.limitOn ? this._limit : this.data.length;
	}

	constructor() {
		this._limit = 5;
		this.limitOn = true;
		this.showMoreLess = true;
		this.selectedData = [];
		this.onModify = new EventEmitter();
		this.onDelete = new EventEmitter();
		this.onSelection = new BehaviorSubject(null);
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
			this.selectedData = [];
			this.nextSelection();
		}
	}

	selected(selectedData: any, index: number) {
		if(this.selectedData[index]) {
			this.selectedData[index] = null;
		} else {
			this.selectedData[index] = selectedData;
		}
		this.nextSelection();
	}

	switchLimit() {
		this.limitOn = !this.limitOn;
	}

	modify(selectedData: any[]) {
		this.onModify.next(selectedData.filter((data) => data));
	}

	delete(selectedData: any[]) {
		this.onDelete.next(selectedData.filter((data) => data));
	}

	private nextSelection() {
		let current = this.selectedData.filter((data) => data);
		this.onSelection.next(current);
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
			let obs = Observable.of(this.data);
			if (this.filter) {
				obs = obs.map((list) => list.filter(this.filter));
			}
			if (this.sort) {
				obs = obs.map((list) => list.sort(this.sort));
			}
			this.filteredData = obs;
		}
	}
}
