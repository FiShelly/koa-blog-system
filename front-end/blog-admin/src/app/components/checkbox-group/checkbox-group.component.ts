import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    forwardRef,
    OnChanges,
    ViewChildren,
    QueryList,
    ContentChildren
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CheckboxComponent} from '../checkbox/checkbox.component';

@Component({
    selector: 'app-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    styleUrls: ['./checkbox-group.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxGroupComponent),
        multi: true
    }],
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor, OnChanges {
    
    @Input() disabled: Boolean = false;
    @Input() model: any[] = [];
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    
    disabledChange: EventEmitter<any> = new EventEmitter<any>();
    // @ViewChildren(CheckboxComponent) checkboxChildren: QueryList<CheckboxComponent>;
    // @ContentChildren(CheckboxComponent) checkboxChildren: QueryList<CheckboxComponent>;
    // @ViewChildren(forwardRef(() => CheckboxComponent))
    // private checkboxChildren: CheckboxComponent;
    
    constructor() {
    }
    
    handleChange($event) {
        if ($event.checked) {
            this.model.push($event.label);
        } else {
            const idx = this.model.findIndex((v) => v === $event.label);
            this.model.splice(idx, 1);
        }
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
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
