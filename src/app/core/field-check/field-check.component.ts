import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'field-check',
    templateUrl: './field-check.component.html',
    styleUrls: ['./field-check.component.css']
})
export class FieldCheckComponent implements OnInit {
    @Input() checked: boolean;

    constructor() { }

    ngOnInit() {
    }

}
