import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BaseModal} from '../base-modal';

@Component({
    selector: 'app-modal-prompt',
    templateUrl: './modal-prompt.component.html',
    styleUrls: ['./modal-prompt.component.scss']
})
export class ModalPromptComponent extends BaseModal implements OnInit {
    static $alias: string = 'prompt';
    type: string = 'text';
    text: string = '';
    value: string = '';
    
    @Output() okCallback: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancelCallback: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() {
        super();
    }
    
    ngOnInit() {
    }
    
    modalCreated(opts: any) {
        Object.keys(opts).forEach(val => {
            this[val] = opts[val];
        });
    }
    
    okHandle() {
        this.close();
        this.okCallback.emit(this.value);
    }
    
    cancelHandle() {
        this.close();
        this.cancelCallback.emit();
    }
}
