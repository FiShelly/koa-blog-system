import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-mask',
    templateUrl: './mask.component.html',
    styleUrls: ['./mask.component.scss']
})
export class MaskComponent implements OnInit {
    
    @Input() zIndex: number = 1000;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
