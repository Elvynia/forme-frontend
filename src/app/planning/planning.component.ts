import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

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
	selectedEvents: Array<MissionEvent>;

	constructor(private eventService: EventService,
		private router: Router) {
		this.calendars = new Array();
		this.selectedEvents = new Array();
	}

	ngOnInit() {
		this.eventService.list()
			.subscribe((events: Array<MissionEvent>) => {
				for (let i = 0; i < events.length; ++i) {
					events[i] = MissionEvent.build(events[i]);
				}
				let today: moment.Moment = moment();
				let current = new Calendar(today.toDate(), events);
				let previous = new Calendar(moment().subtract(1, 'months').toDate(), events);
				this.calendars = [
					previous,
					current, 
					new Calendar(today.add(1, 'months').toDate(), events),
					new Calendar(today.add(1, 'months').toDate(), events)
				];
			});
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
			this.selectedEvents.forEach((event: MissionEvent) => this.eventService.delete(event));
			this.selectedEvents = new Array();
		}
	}
}
