import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Entity } from './entity';

export class FormeDataSource<E extends Entity> extends DataSource<E> {
	private _data: BehaviorSubject<E[]>;
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
		return Observable.merge(this._data.asObservable(),
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

	public get data(): Array<E> {
		return this._data.value;
	}
	
	constructor(private paginator?: MatPaginator, private sort?: MatSort) {
		super();
		this._data = new BehaviorSubject([]);
		this._filter = new BehaviorSubject((item) => item);
		this._length = new BehaviorSubject(0);
		this._loading = new BehaviorSubject(false);
	}

	public publish(_data: E[]) {
		this._data.next(_data);
	}

	public add(_data: E) {
		let newList = this._data.value.slice();
		newList.push(_data);
		this._data.next(newList);
	}

	public update(id: number, _data?: E) {
		let newList = this._data.value.slice();
		let index = newList.findIndex((_data: E) => _data.id === id);
		if (index >= 0) {
			if (_data) {
				newList.splice(index, 1, _data);
			} else {
				newList.splice(index, 1);
			}
		}
		this._data.next(newList);
	}

	connect(): Observable<E[]> {
		setTimeout(() => this._loading.next(true));
		const displayDataChanges = [
			this._data.asObservable(),
			this.paginator.page,
			this.sort.sortChange,
			this._filter
		];

		let connection = Observable.merge(...displayDataChanges).map(() => {
			let _data;
			if (this.filter) {
				_data = this._data.value.slice().filter(this.filter, this.filterContext);
			} else {
				_data = this._data.value.slice();
			}
			this._length.next(_data.length);
			if (this.sort.active) {
				_data.sort((a, b) => {
					return (a[this.sort.active] < b[this.sort.active] ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
				});
			}
			const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
			_data = _data.splice(startIndex, this.paginator.pageSize)
			// FIXME: Handle detailRow ? 
			// const result = [];
			// _data.forEach((item: any) => result.push(item, {detailRow: true, item}));
			// return result;
			return _data;
		});
		connection.first().subscribe(() => setTimeout(() => this._loading.next(false)));
		return connection;
	}

	disconnect() {
		this._data.complete();
		// FIXME: this._data.unsubscribe() worth it after complete ?
		this._length.complete();
		this._filter.complete();
	}
}
