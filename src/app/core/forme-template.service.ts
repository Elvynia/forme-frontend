import { Injectable, TemplateRef } from '@angular/core';
import { FormeTemplate } from './forme-template';

@Injectable()
export class FormeTemplateService {
	private templates: Array<FormeTemplate>;

	constructor() {
		this.templates = new Array();
	}

	register(id: string, ref: TemplateRef<any>) {
		this.templates.push(new FormeTemplate(id, ref));
	}

	getTemplateRef(templateId: string) : TemplateRef<any> {
		let template = this.templates.find((template) => template.id === templateId);
		return template ? template.ref : null;
	}
}
