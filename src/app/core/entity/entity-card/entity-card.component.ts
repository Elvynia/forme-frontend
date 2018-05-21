import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ContentChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Entity } from '../entity';
import { EntityService } from '../entity.service';

@Component({
    selector: 'entity-card',
    templateUrl: './entity-card.component.html',
    styleUrls: ['./entity-card.component.css']
})
export class EntityCardComponent implements OnInit, OnChanges {
    private subscription: Subscription;
    private hideTitle: boolean;
    private entity: Entity;
    
    @Input() id: number;
    @Input() avatarUrl: string;
    @Input() actions: Array<string>;
    @Input() deleteAlert: boolean;

    @Output() onShowEdit: EventEmitter<Entity>;

    @ContentChild('cardTitle') cardTitle;
    @ContentChild('cardSubtitle') cardSubtitle;
    @ContentChild('cardContent') cardContent;

    constructor(private entityService: EntityService<Entity>) {
        this.deleteAlert = true;
        this.hideTitle = true;
        this.onShowEdit = new EventEmitter();
    }

    ngOnInit() {
        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges) {
		if (changes.id) {
			this.refresh();
		}
	}

	handleAction(event: MouseEvent, action: string) {
		switch (action) {
			case 'delete':
				if (this.entity.id) {
                    if (this.deleteAlert && confirm("Voulez-vous vraiment supprimer cette élément ?")) {
                        this.entityService.delete(this.entity);   
                    } else {
                        // FIXME Cancel message.
                    }
				} else {
                    // FIXME Logger warn.
                }
				break;
			case 'edit':
				this.onShowEdit.next(this.entity);
				break;
			default:
			// FIXME Logger warn.
		}
	}

	private refresh() {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = null;
			this.entity = undefined;
		}
		if (this.id) {
			this.subscription = this.entityService.get(this.id)
				.subscribe((entity: Entity) => this.entity = entity);
		}
	}

}
