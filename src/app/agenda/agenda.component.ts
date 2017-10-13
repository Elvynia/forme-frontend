import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-agenda',
	templateUrl: './agenda.component.html',
	styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
	viewDate: Date;

	constructor() {
		this.viewDate = new Date();
	}

	ngOnInit() {
	}

}
