import { Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { Entity } from '../../entity';
import { EVENT } from '../../event';
import { AuthService } from '../auth.service';
import { EntityService } from '../entity.service';
import { FormeDataSource } from '../forme-data-source';
import { InvoiceService } from '../../invoice.service';

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
