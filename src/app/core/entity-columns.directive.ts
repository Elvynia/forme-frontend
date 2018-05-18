import { Directive, Input, SimpleChanges, OnChanges, HostBinding } from '@angular/core';
import { ListColumn, EntityListComponent } from './entity-list/entity-list.component';

@Directive({
    selector: '[entityColumns]'
})
export class EntityColumnsDirective implements OnChanges {
    @Input('entityColumns') displayedColumns: Array<string>;

    constructor(protected host: EntityListComponent) { }

    ngOnInit() {
        if (!this.displayedColumns) {
            this.displayedColumns = ['id'];
        }
        this.updateFromDisplay();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.displayedColumns && !changes.displayedColumns.isFirstChange
            || changes.columns && !changes.columns.isFirstChange) {
            this.updateFromDisplay();
			this.host.columns.forEach((col) => {
				col.display = this.displayedColumns.indexOf(col.name) >= 0;
			});
		}
    }
    
    private updateFromDisplay() {
        this.displayedColumns.forEach((name) => {
            let colNames = this.host.columns.map((col) => col.name);
            if (colNames.indexOf(name) < 0) {
                this.host.columns.push({
                    name: name,
                    label: name.toUpperCase(),
                    template: 'col' + name.charAt(0).toUpperCase() + name.slice(1),
                    display: true
                });
            }
        });
    }

}
