import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-status-field',
	templateUrl: './status-field.component.html',
	styleUrls: ['./status-field.component.css']
})
export class StatusFieldComponent {
	@Input() status: boolean;
	@Output() statusChange: EventEmitter<boolean>;

	constructor() {
		this.statusChange = new EventEmitter<boolean>();
	}

}
