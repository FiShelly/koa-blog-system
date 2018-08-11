import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BaseModal} from '../base-modal';

@Component({
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent extends BaseModal implements OnInit {
    static $alias: string = 'confirm';
    text: string = '';
    
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
        this.okCallback.emit();
    }
    
    cancelHandle() {
        this.close();
        this.cancelCallback.emit();
    }
}
