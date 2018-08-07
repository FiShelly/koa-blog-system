import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TabsComponent),
        multi: true
    }],
})
export class TabsComponent implements  OnInit, ControlValueAccessor, OnChanges  {
    @Input() disabled: Boolean = false;
    @Input() model: any;
    
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    disabledChange: EventEmitter<any> = new EventEmitter<any>();
    subscriber: Function[] = [];
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngOnChanges(changes): void {
        if (changes.hasOwnProperty('disabled')) {
            this.disabledChange.emit(changes['disabled']);
        }
    }
    
    writeValue(value: any): void {
        this.model = value;
    }
    
    registerOnChange(fn: Function): void {
        this.controlChange = fn;
    }
    
    registerOnTouched(fn: Function): void {
        this.controlTouch = fn;
    }
    
    private controlChange: Function = () => {
    };
    
    private controlTouch: Function = () => {
    };
    
}
