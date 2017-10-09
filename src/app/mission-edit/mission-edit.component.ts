import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Mission } from '../mission';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.css']
})
export class MissionEditComponent implements OnInit {
  @Input() mission: Mission;
  @Input() new: boolean;
  companies: Array<Company>;

  constructor(private missionService: MissionService,
  	private companyService: CompanyService) {
  	this.mission = new Mission();
  	this.new = false;
  }

  ngOnInit() {
    this.companyService.list()
      .subscribe((data: Array<Company>) => {
        this.companies = data;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
  	if (changes['mission']) {
  		this.new = this.mission.id === undefined || this.mission.id === null;
  	}
  }

  submit() {
    if (this.new) {
    	this.missionService.create(this.mission);
    } else {
    	this.missionService.update(this.mission);
    }
    this.mission = new Mission();
  }
}
