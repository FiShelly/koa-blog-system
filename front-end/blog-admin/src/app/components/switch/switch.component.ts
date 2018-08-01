import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SwitchComponent),
        multi: true
    }],
})
export class SwitchComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {
    
    @Input() disabled: Boolean = false;
    @Input() model: any;
    @Input() name: String;
    @Input('active-text') activeText: String;
    @Input('inactive-text') inactiveText: String;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngOnChanges(): void {
    }
    
    ngAfterViewInit(): void {
    }
    
    handleInputChange(val: string): void {
        this.model = val;
        this.modelChange.emit(this.model);
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
