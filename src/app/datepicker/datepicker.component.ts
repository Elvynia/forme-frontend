import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';

import * as moment from 'moment';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {
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
