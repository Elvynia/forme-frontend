import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';

import * as moment from 'moment';

@Component({
	selector: 'field-date',
	templateUrl: './field-date.component.html',
	styleUrls: ['./field-date.component.css']
})
export class FieldDateComponent {
	@Input() selection: moment.Moment;
	@Output() selectionChange: EventEmitter<moment.Moment>;
	@Input() name: string;
	@Input() label: string;
	@ViewChild('picker') picker: MatDatepicker<moment.Moment>;

	constructor() {
		this.selectionChange = new EventEmitter<moment.Moment>();
	}

	updateSelection() {
		this.selectionChange.emit(this.selection);
	}

	openCal() {
		this.picker.open();
	}
}
