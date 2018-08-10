import {Input, ViewChild} from '@angular/core';

export class BaseModal {
    @ViewChild('modal') modal: any;
    
    @Input() title: string;
    
    constructor() {
    }
    
    close() {
    }
    
    
}
