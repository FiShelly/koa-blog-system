import {
    NgModule,
    Component,
    Input,
    Output,
    ElementRef,
    OnInit,
    EventEmitter,
    forwardRef,
    ViewChild,
    ChangeDetectorRef,
    OnChanges, SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }],
})
export class InputComponent implements OnInit, OnChanges, ControlValueAccessor {
    
    @ViewChild('input') input: any;
    
    @Input() type: String = 'type';
    @Input() suffix_icon: String = '';
    @Input() prefix_icon: String = '';
    @Input() disabled: Boolean = false;
    @Input() readonly: Boolean = false;
    @Input() model: String = '';
    @Input() placeholder: String = '';
    @Input() autocomplete: String = 'on';
    
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();
    
    // @Output('iconClick') iconClick: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngOnChanges(changes: SimpleChanges) {
    }
    
    handleInputChange(val: string): void {
        this.model = val;
        this.controlChange(val);
        setTimeout(() => {
            this.modelChange.emit(val);
        });
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
