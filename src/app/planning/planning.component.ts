import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router} from '@angular/router';

import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { Calendar } from '../calendar';
import { MissionEvent } from '../mission-event';
import { MissionService } from '../mission/mission.service';
import { EventService } from '../event.service';

@Component({
	selector: 'app-planning',
	templateUrl: './planning.component.html',
	styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
	calendars: Array<Calendar>;
	events: Array<MissionEvent>;
	selectedEvent: MissionEvent;
	newEvent: MissionEvent;
	@Input() monthOffset: number;

	constructor(private eventService: EventService,
		private missionService: MissionService,
		private router: Router) {
		this.monthOffset = 0;
		this.calendars = new Array();
		this.newEvent = new MissionEvent();
		this.newEvent.mdStart = null;
		this.newEvent.mdEnd = null;
	}

	ngOnInit() {
		this.eventService.list()
			.subscribe((events: Array<MissionEvent>) => {
				this.events = events;
				this.recalculateView();
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['viewMonth']) {
			this.recalculateView();
		}
	}

	onEventSelect(data: any) {
		if (this.selectedEvent && this.selectedEvent.id === data.event.id) {
			this.selectedEvent = null;
		} else {
			this.selectedEvent = data.event;
		}
	}

	onDaySelect(event: any, calendar: Calendar) {
		if (event.target.children.length === 1) {
			let day = event.target.children[0].textContent;
			let m = moment(calendar.viewDate).date(day);
			if (this.newEvent.start) {
				this.newEvent.mdEnd = m;
			} else {
				this.newEvent.mdStart = m;
			}
		}
	}

	addEvent() {
		if (this.newEvent.start && this.newEvent.end) {
			this.eventService.create(this.newEvent).subscribe((event: MissionEvent) => {
				this.router.navigate(['event', event.id]);
			});
		}
	}

	modifyEvent() {
		if (this.selectedEvent) {
			this.router.navigate(['/event/', this.selectedEvent.id]);
		}
	}

	deleteEvent() {
		if (this.selectedEvent) {
			this.eventService.delete(this.selectedEvent).subscribe(() => this.eventService.list());
		}
	}

	incrMonthOffset(offset: number) {
		this.monthOffset += offset;
		this.recalculateView();
	}

	isInNew(date: string): boolean {
		let current = moment(date);
		if (this.newEvent.start && !this.newEvent.end) {
			return moment(this.newEvent.start).isSame(current);
		} else if (this.newEvent.end) {
			return (moment(this.newEvent.start).isBefore(current) || moment(this.newEvent.start).isSame(current, 'days'))
				&& (moment(this.newEvent.end).isAfter(current) || moment(this.newEvent.end).isSame(current, 'days'));
		}
		return false;
	}

	private recalculateView() {
		let events = [];
		for (let i = 0; i < this.events.length; ++i) {
			events[i] = this.events[i].clone(this.events[i]);
			if (events[i].missionId) {
				events[i].missionLabel = this.missionService.get(events[i].missionId).pluck('label');
			}
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
