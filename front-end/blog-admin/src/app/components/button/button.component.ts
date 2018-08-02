import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy,} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    
    @Input() type: String = 'normal';
    @Input() text: String = '';
    @Input() theme: String = 'default';
    @Input() disabled: Boolean = false;
    @Input() loading: Boolean = false;
    @Input() plain: Boolean = false;
    @Input() round: Boolean = false;
    @Input() circle: Boolean = false;
    @Input() multiple: Boolean = false;
    @Output() click: EventEmitter<any> = new EventEmitter<any>();
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    clickEventHandle($e) {
        console.log($e);
        $e.stopPropagation();
        this.click.emit($e);
    }
    
    changeEventHandle($e) {
        $e.stopPropagation();
        this.change.emit($e);
    }
}
