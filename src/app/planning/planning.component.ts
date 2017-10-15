import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router} from '@angular/router';

import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { Calendar } from '../calendar';
import { MissionEvent } from '../mission-event';
import { EventService } from '../event.service';

@Component({
	selector: 'app-planning',
	templateUrl: './planning.component.html',
	styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
	calendars: Array<Calendar>;
	events: Array<MissionEvent>;
	selectedEvents: Array<MissionEvent>;
	@Input() monthOffset: number;

	constructor(private eventService: EventService,
		private router: Router) {
		this.monthOffset = 0;
		this.calendars = new Array();
		this.selectedEvents = new Array();
	}

	ngOnInit() {
		this.eventService.list()
			.subscribe((events: Array<MissionEvent>) => {
				this.events = events
				this.recalculateView()
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['viewMonth']) {
			this.recalculateView();
		}
	}

	onEventSelect(data: any) {
		let index = this.selectedEvents.findIndex((event:MissionEvent) => event.id === data.event.id);			
		if (index && index >= 0) {
			this.selectedEvents.splice(index, 1);
		} else {
			this.selectedEvents.push(data.event);
		}
		console.log('Selected events : ' + JSON.stringify(this.selectedEvents));
	}

	onDaySelect(event: any, calendar: Calendar) {
		console.log(event);
	}

	modifyEvent() {
		if (this.selectedEvents && this.selectedEvents[0]) {
			this.router.navigate(['/event/', this.selectedEvents[0].id]);
			let current = this.selectedEvents;
			current.splice(0, 1);
			this.selectedEvents = current.slice();
		}
	}

	deleteEvents() {
		if (this.selectedEvents) {
			for (let i = 0; i < this.selectedEvents.length; ++i) {
				let toDelete = this.selectedEvents[i];
				this.eventService.delete(toDelete);
				let index = this.events.findIndex((event:MissionEvent) => event.id === toDelete.id);
				this.events.splice(index, 1);
			}
			this.selectedEvents = new Array();
			this.recalculateView();
		}
	}

	incrMonthOffset(offset: number) {
		this.monthOffset += offset;
		this.recalculateView();
	}

	private recalculateView() {
		let events = [];
		for (let i = 0; i < this.events.length; ++i) {
			events[i] = MissionEvent.build(this.events[i]);
		}
		let today: moment.Moment = moment().add(this.monthOffset, 'months');
		let current = new Calendar(today.toDate(), events);
		let previous = new Calendar(today.subtract(1, 'months').toDate(), events);
		this.calendars = [
			previous,
			current, 
			new Calendar(today.add(2, 'months').toDate(), events),
			new Calendar(today.add(1, 'months').toDate(), events)
		];
	}
}
