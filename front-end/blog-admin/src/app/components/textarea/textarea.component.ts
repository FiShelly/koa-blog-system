import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextareaComponent),
        multi: true
    }],
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
    @Input() disabled: Boolean = false;
    @Input() readonly: Boolean = false;
    @Input() model: String = '';
    @Input() placeholder: String = '';
    @Input() rows: Number = 0;
    
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    handleInputChange(val: string): void {
        this.model = val;
        this.modelChange.emit(val);
        this.controlChange(val);
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
