export enum EVENT {
	LIST, UPDATE, DELETE, ADD, INIT, GET
}

export class Event {
	readonly type: EVENT;
	data: any;

	constructor(type: EVENT, data?: any) {
		this.type = type;
		this.data = data;
	}
}
