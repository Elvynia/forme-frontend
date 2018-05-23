import { Component, OnInit, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Observable } from 'rxjs';

import { Entity } from '../../entity/entity';
import { EntityService } from '../../entity/entity.service';

@Component({
    selector: 'field-combobox',
    templateUrl: './field-combobox.component.html',
    styleUrls: ['./field-combobox.component.css']
})
export class FieldComboboxComponent implements OnInit {
    private entities: Array<Entity>;

    entityControl: FormControl;
    filteredEntities: Observable<Entity[]>;

    @Input() label: string;
    @Input() selection: Entity;
    @Input() filter: (entity: Entity) => boolean;
    @Input() display: (entity: Entity) => string;
    
    @Output() selectionChange: EventEmitter<Entity>;

    @ContentChild('fieldOption') fieldOption;

    constructor(private entityService: EntityService<Entity>) {
        this.entities = [];
        this.selectionChange = new EventEmitter();
        this.entityControl = new FormControl();
        this.filteredEntities = this.entityControl.valueChanges
            .startWith(null)
            .map((value: string) => value ? this.entities.filter(this.filter, { value: value}) : this.entities.slice());
    }

    ngOnInit() {
        this.entityService.list().subscribe((list) => this.entities = list);
    }

    updateSelection(event: MatAutocompleteSelectedEvent) {
    	this.selectionChange.next(event.option.value);
    }

}
