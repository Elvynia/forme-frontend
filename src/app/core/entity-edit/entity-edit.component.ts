import { Component, OnInit, Input, ContentChild, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityService } from '../entity.service';
import { Entity } from '../entity';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'entity-edit',
    templateUrl: './entity-edit.component.html',
    styleUrls: ['./entity-edit.component.css']
})
export class EntityEditComponent implements OnInit {
    private subscription: Subscription;
    private entity: any;

    @Input() id: number;
    @Input() createTitle: string;
    @Input() updateTitle: string;

    @ContentChild('formContent') formContent;

    constructor(private entityService: EntityService<Entity>) {
        this.createTitle = 'Création';
        this.updateTitle = 'Mise à jour';
        this.entity = this.entityService.getNew();
    }

    ngOnInit() {
        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.id) {
            this.refresh();
        }
    }

    submit(form: NgForm) {
        if (this.entity.id) {
            this.entityService.update(this.entity);
        } else {
            this.entityService.create(this.entity);
        }
        // FIXME: Input? form.resetForm(new Invoice());
    }

	private refresh() {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = null;
			this.entity = this.entityService.getNew();
		}
		if (this.id) {
            this.subscription = this.entityService.get(this.id)
				.subscribe((entity: Entity) => this.entity = this.entityService.getNew().clone(entity));
		}
	}

}
