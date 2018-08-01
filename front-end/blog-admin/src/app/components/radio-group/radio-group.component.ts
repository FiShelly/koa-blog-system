import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-radio-group',
    templateUrl: './radio-group.component.html',
    styleUrls: ['./radio-group.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioGroupComponent),
        multi: true
    }],
})
export class RadioGroupComponent implements OnInit, ControlValueAccessor {
    
    @Input() disabled: Boolean = false;
    @Input() model: any;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  
    subscriber: Function[] = [];
    
    constructor() {
    }
    
    handleChange($event) {
        this.model = $event;
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
        this.subscriber.forEach(sub => sub());
    }
    
    ngOnInit() {
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
