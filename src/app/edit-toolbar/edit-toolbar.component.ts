import { Component, OnInit, Input, Output } from '@angular/core';

import { AngularSubject } from '../angular-subject';

@Component({
	selector: 'app-edit-toolbar',
	templateUrl: './edit-toolbar.component.html',
	styleUrls: ['./edit-toolbar.component.css']
})
export class EditToolbarComponent implements OnInit {
	@Input() data: any;
	shouldAdd: boolean;
	shouldModify: boolean;
	shouldDelete: boolean;
	@Output() onAdd: AngularSubject;
	@Output() onModify: AngularSubject;
	@Output() onDelete: AngularSubject;

	constructor() {
		this.shouldAdd = false;
		this.shouldModify = false;
		this.shouldDelete = false;
		this.onAdd = new AngularSubject();
		this.onModify = new AngularSubject();
		this.onDelete = new AngularSubject();
	}

	ngOnInit() {
		this.onAdd.onSubscribe((isSubscribed) => this.shouldAdd = isSubscribed);
		this.onModify.onSubscribe((isSubscribed) => this.shouldModify = isSubscribed);
		this.onDelete.onSubscribe((isSubscribed) => this.shouldDelete = isSubscribed);
	}

	fireAdd() {
		this.onAdd.emit(this.data);
	}

	fireModify() {
		this.onModify.emit(this.data);
	}

	fireDelete() {
		this.onDelete.emit(this.data);
	}

}
