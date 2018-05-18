import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Entity } from './entity';

export class FormeDataSource<E extends Entity> extends DataSource<E> {
	private data: BehaviorSubject<E[]>;
	private _filter: BehaviorSubject<(item) => boolean>;
	private _length: BehaviorSubject<number>;
	private _loading: BehaviorSubject<boolean>;
	public filterContext: any;

	public get length(): Observable<number> {
		return this._length.asObservable();
	}
	
	public get loading(): Observable<boolean> {
		return this._loading.asObservable();	
	}

	public get refresher(): Observable<any> {
		return Observable.merge(this.data.asObservable(),
			this.paginator.page,
			this.sort.sortChange,
			this._filter
		);
	}

	public get filter(): (item) => boolean {
		return this._filter.value;
	}

	public set filter(callback: (item) => boolean) {
		this._filter.next(callback);
	}
	
	constructor(private paginator?: MatPaginator, private sort?: MatSort) {
		super();
		this.data = new BehaviorSubject([]);
		this._filter = new BehaviorSubject((item) => item);
		this._length = new BehaviorSubject(0);
		this._loading = new BehaviorSubject(false);
	}

	public publish(data: E[]) {
		this.data.next(data);
	}

	public add(data: E) {
		let newList = this.data.value.slice();
		newList.push(data);
		this.data.next(newList);
	}

	public update(id: number, data?: E) {
		let newList = this.data.value.slice();
		let index = newList.findIndex((data: E) => data.id === id);
		if (index >= 0) {
			if (data) {
				newList.splice(index, 1, data);
			} else {
				newList.splice(index, 1);
			}
		}
		this.data.next(newList);
	}

	connect(): Observable<E[]> {
		this._loading.next(true)
		// setTimeout(() => this._loading.next(true));
		const displayDataChanges = [
			this.data.asObservable(),
			this.paginator.page,
			this.sort.sortChange,
			this._filter
		];

		let connection = Observable.merge(...displayDataChanges).map(() => {
			let data;
			if (this.filter) {
				data = this.data.value.slice().filter(this.filter, this.filterContext);
			} else {
				data = this.data.value.slice();
			}
			this._length.next(data.length);
			if (this.sort.active) {
				data.sort((a, b) => {
					return (a[this.sort.active] < b[this.sort.active] ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
				});
			}
			const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
			data = data.splice(startIndex, this.paginator.pageSize)
			// FIXME: Handle detailRow ? 
			// const result = [];
			// data.forEach((item: any) => result.push(item, {detailRow: true, item}));
			// return result;
			return data;
		});
		connection.first().subscribe(() => setTimeout(() => this._loading.next(false)));
		return connection;
	}

	disconnect() {
		this.data.complete();
		// FIXME: this.data.unsubscribe() worth it after complete ?
		this._length.complete();
		this._filter.complete();
	}
}
