import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'app-layout-list',
  templateUrl: './layout-list.component.html',
  styleUrls: ['./layout-list.component.css']
})
export class LayoutListComponent implements OnInit {
	@Input('listTitle') title: string;
	@Input() filter: (a:any, b:any) => number;
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
			this.filteredData = Observable.of(this.data).map((list) => list.sort(this.filter));
		}
	}
}
