import { TemplateRef } from "@angular/core";

export class FormeTemplate {
    id: string;
    ref: TemplateRef<any>;

    constructor(id: string, ref: TemplateRef<any>) {
        this.id = id;
        this.ref = ref;
    }
}
