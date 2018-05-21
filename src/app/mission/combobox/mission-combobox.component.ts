import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Mission } from '../mission';
import { MissionService } from '../mission.service';

import { Observable } from 'rxjs/Rx';
import { EntityService } from '../../core';

@Component({
  selector: 'mission-combobox',
  templateUrl: './mission-combobox.component.html',
  styleUrls: ['./mission-combobox.component.css'],
  providers: [
      { provide: EntityService, useExisting: MissionService }
  ]
})
export class MissionComboboxComponent {
	@Input() selection: Mission;
	@Output() selectionChange: EventEmitter<Mission>;

	constructor() {
		this.selectionChange = new EventEmitter();
	}

    filterMission = function(mission: Mission) {
        let context: any = this;
        if (context.value && context.value.id) {
            return context.value.id !== mission.id;
        } else if (typeof context.value === "string") { 
            return mission.label.indexOf(context.value.toUpperCase()) >= 0
                || mission.title.toLowerCase().indexOf(context.value.toLowerCase()) >= 0;
        }
    }

    displayMission = function(mission: Mission) {
        return mission ? mission.title + ' (' + mission.label + ')' : '';
    }
}
