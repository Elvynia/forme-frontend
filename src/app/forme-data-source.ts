import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Entity } from './entity';
import { BaseService } from './base.service';

export class FormeDataSource<E extends Entity> extends DataSource<E> {
	private data: BehaviorSubject<E[]>;
	private page: any;
	private sortData: any;

	public get length(): number {
		return this.data.value.length;
	}

	public get refresher(): Observable<any> {
		return Observable.merge(this.data.asObservable(),
			this.paginator.page,
			this.sort.sortChange);
	}
	
	constructor(private paginator?: MatPaginator, private sort?: MatSort) {
		super();
		this.data = new BehaviorSubject([]);
	}

	publish(data: E[]) {
		this.data.next(data);
	}

	add(data: E) {
		let newList = this.data.value.slice();
		newList.push(data);
		this.data.next(newList);
	}

	update(id: number, data?: E) {
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
		const displayDataChanges = [
		this.data.asObservable(),
		this.paginator.page,
		this.sort.sortChange
		];

		return Observable.merge(...displayDataChanges).map(() => {
			let data = this.data.value.slice();
			if (this.sort.active) {
				data.sort((a, b) => {
					return (a[this.sort.active] < b[this.sort.active] ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
				});
			}
			const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
			return data.splice(startIndex, this.paginator.pageSize);
		});
	}

	disconnect() {}
}
