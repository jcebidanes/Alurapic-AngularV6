import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ap-vmessage',
    templateUrl: './vmessage.component.html',
    styleUrls: ['./vmessage.component.css']
})
export class VMessageComponent implements OnInit {

    @Input() text = '';

    constructor() { }

    ngOnInit() {
    }

}
