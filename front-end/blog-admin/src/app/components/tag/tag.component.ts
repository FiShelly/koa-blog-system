import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
    
    @Input() type: string = 'default';
    @Input() leftIcon: string = '';
    @Input() rightIcon: string = '';
    @Input() isHover: boolean = false;
    
    @Output() leftIconClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() rightIconClick: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    handlerClick($e, type) {
        $e.stopPropagation();
        this[`${type}IconClick`].emit($e);
    }
}
