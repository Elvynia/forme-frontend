import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Mission } from '../mission';
import { MissionService } from '../mission.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-mission-combobox',
  templateUrl: './mission-combobox.component.html',
  styleUrls: ['./mission-combobox.component.css']
})
export class MissionComboboxComponent implements OnInit {
	@Input() selection: Mission;
	@Output() selectionChange: EventEmitter<Mission>;
	clientControl: FormControl;
	companies: Array<Mission>;
	filteredMissions: Observable<Mission[]>;

	constructor(private missionService: MissionService) {
		this.selectionChange = new EventEmitter();
		this.companies = [];
        this.clientControl = new FormControl();
        this.filteredMissions = this.clientControl.valueChanges
            .startWith(null)
            .map((value: string) => value ? this.filterCompanies(value) : this.companies.slice());
	}

	ngOnInit() {
		this.missionService.list()
	        .subscribe((data: Array<Mission>) => {
	            this.companies = data;
	        });
	}

    filterCompanies(filter: string) {
        if (typeof filter === "string") { 
            return this.companies.filter((mission: Mission) => 
            	mission.label.indexOf(filter.toUpperCase()) >= 0
                || mission.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
        }
    }

    displayMission(mission: Mission) {
        return mission ? mission.title + ' (' + mission.label + ')' : '';
    }

    updateSelection(event: MatAutocompleteSelectedEvent) {
    	this.selectionChange.next(event.option.value);
    }
}
