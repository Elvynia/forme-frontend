import { Directive, TemplateRef, Input } from '@angular/core';
import { FormeTemplateService } from './forme-template.service';
import { FormeTemplate } from './forme-template';

@Directive({
    selector: '[formeTemplate]'
})
export class FormeTemplateDirective {
    @Input('formeTemplate') templateId;

    constructor(private host: TemplateRef<any>, private service: FormeTemplateService) { }

    ngOnInit() {
        this.service.register(this.templateId, this.host);
    }
}
