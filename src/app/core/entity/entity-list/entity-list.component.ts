import { Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { Entity } from '../entity';
import { EntityService } from '../entity.service';
import { AuthService } from '../../auth';
import { EVENT } from '../../event';
import { FormeDataSource } from '../../forme-data-source';

import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

export interface ListColumn {
    display: boolean
    label: string,
    name: string,
    template: string,
};

@Component({
    selector: 'entity-list',
    templateUrl: './entity-list.component.html',
    styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit, OnChanges, OnDestroy {
    private subscriptions: Array<Subscription>;
    private dataSource: FormeDataSource<any>;
    private fileControl: FormControl;
    private file: any;

    @Input() listTitle: string;
    @Input() columns: Array<ListColumn>;
    @Input() filter: (item) => boolean;
    @Input() filterContext: any;

    @Output() onSelect: EventEmitter<Entity>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<Entity>>;

    get displayedColumns(): Array<string> {
        return this.columns.filter((col) => col.display).map((col) => col.name);
    }

    constructor(private authService: AuthService, private entityService: EntityService<any>) {
        this.columns = new Array();
        this.subscriptions = new Array();
        this.onSelect = new EventEmitter();
        this.fileControl = new FormControl();
    }

    ngOnInit() {
        this.subscriptions.push(this.authService.loggedIn.subscribe(() => {
            this.subscriptions.push(this.entityService.list()
                .subscribe((data: any) => this.dataSource && this.dataSource.publish(data)));
            this.subscriptions.push(this.entityService.eventsByType(EVENT.ADD)
                .subscribe((data: any) => this.dataSource.add(data)));
            this.subscriptions.push(this.entityService.eventsByType(EVENT.DELETE)
                .subscribe((data: any) => this.dataSource && this.dataSource.update(data.id)));
            this.subscriptions.push(this.entityService.eventsByType(EVENT.UPDATE)
                .subscribe((data: any) => this.dataSource && this.dataSource.update(data.id, data)));
        }));
        this.dataSource = new FormeDataSource(this.paginator, this.sort);
        this.refreshFilter();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.filter || changes.filterContext) {
            this.refreshFilter();
        }
    }

    ngOnDestroy() {
        this.dataSource.disconnect();
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    getTemplate(id: string): TemplateRef<Entity> {
        // FIXME: Should not use private API...
        return this.templates ? this.templates.find((template: any) => template._def.references[id]) : null;
    }

    select(entity: Entity) {
        this.onSelect.next(entity);
    }

    exportCsv() {
        let today = moment();
        let ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.entityService.exportData(this.dataSource.data));
        let wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'all data');
        XLSX.writeFile(wb, this.entityService.getNew().constructor.name.toLowerCase()
            + '-list_' + today.format('YYYY-MM-DD_') + today.valueOf() + '.csv');
    }

    onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length > 1) {
            throw new Error('Cannot use multiple files');
        } else if (target.files.length !== 0) {
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary', raw: true});

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                let data = XLSX.utils.sheet_to_json(ws);
                // console.log('Data imported : ', data);
                this.entityService.importData(data);
            };
            reader.readAsBinaryString(target.files[0]);
        }
	}

    private refreshFilter() {
        if (this.dataSource) {
            if (this.filter) {
                this.dataSource.filter = this.filter;
                this.dataSource.filterContext = this.filterContext || this;
            } else {
                this.dataSource.filter = undefined;
                this.dataSource.filterContext = undefined;
            }
        }
    }

}
