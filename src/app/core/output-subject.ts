import { EventEmitter} from '@angular/core';

import { BehaviorSubject } from 'rxjs/Rx';

export class OutputSubject extends EventEmitter<any> {
	private _onSubscribe: BehaviorSubject<boolean>;

	constructor() {
		super();
		this._onSubscribe = new BehaviorSubject<boolean>(false);
	}

	public subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
		this._onSubscribe.next(true);
		return super.subscribe(generatorOrNext, error, complete);
	}

	public onSubscribe(predicate: (boolean) => {}) {
		this._onSubscribe.subscribe(predicate);
	}
}
