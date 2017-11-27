import { Component, OnInit, OnChanges, SimpleChanges, Input, Output } from '@angular/core';

import * as $ from 'jquery';

import { AngularSubject } from '../angular-subject';

@Component({
	selector: 'app-edit-toolbar',
	templateUrl: './edit-toolbar.component.html',
	styleUrls: ['./edit-toolbar.component.css']
})
export class EditToolbarComponent implements OnInit {
	@Input() data: any;
	@Input() select: string;
	@Input() float: string;
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

	ngOnChanges(changes: SimpleChanges) {
		if (changes['select']) {
			setTimeout(() => this.reloadSelectListeners(changes['select'].previousValue), 200);
		}
	}

	fireAdd(event: MouseEvent) {
		this.onAdd.emit(this.data);
		event.cancelBubble = true;
	}

	fireModify(event: MouseEvent) {
		this.onModify.emit(this.data);
		event.cancelBubble = true;
	}

	fireDelete(event: MouseEvent) {
		this.onDelete.emit(this.data);
		event.cancelBubble = true;
	}

	private reloadSelectListeners(oldValue?: string) {
		if (oldValue) {
			this.data = null;
			let element = document.querySelector(oldValue);
			if (element) {
				element.removeEventListener('click', this.selectListener);
				element.removeEventListener('DOMSubtreeModified', this.resetListener);
			}
		}
		if (this.select) {
			this.data = new Array();
			let element = document.querySelector(this.select);
			if (element) {
				element.addEventListener('click', (event) => this.selectListener(event));
				element.addEventListener('DOMSubtreeModified', () => this.resetListener());
			}
		}
	}

	private selectListener(event: Event) {
		let result;
		let path:any = (<any> event).path;
		for (let el of path) {
			if (el.nodeName === 'MAT-ROW' && el.attributes['matripple']) {
				result = el;
				break;
			}
		}
		if (result) {
			let index = this.data.findIndex((data: any) => data === result.title);
			if (index >= 0) {
				this.data.splice(index, 1);
				$(result).removeClass('mat-row-selected');
			} else {
				this.data.push(result.title);
				$(result).addClass('mat-row-selected');
			}
		}
	}

	private resetListener() {
		this.data = [];
		let elements = document.querySelectorAll(this.select + ' mat-row');
		for (let i = 0; i < elements.length; ++i) {
			$(elements[i]).removeClass('mat-row-selected');
		}
	}
}
