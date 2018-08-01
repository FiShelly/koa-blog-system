import {
    AfterViewInit,
    Component,
    EventEmitter,
    forwardRef,
    Optional,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RadioGroupComponent} from '../radio-group/radio-group.component';
import {validator} from '../../shared/utils/normal';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
    }],
})
export class RadioComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {
    @ViewChild('content') content: any;
    
    @Input() disabled: Boolean = false;
    @Input() label: String;
    @Input() model: any;
    @Input() indeterminate: Boolean = false;
    @Input() name: String;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    
    showLabel: Boolean = false;
    private isHasGroup = !!this.group;
    
    constructor(
        @Optional() private group: RadioGroupComponent
    ) {
    }
    
    
    ngOnInit() {
        if (this.group) {
            this.group.disabledChange.subscribe(($e) => {
                this.disabled = $e.currentValue;
            });
        }
    }
    
    ngAfterViewInit(): void {
        setTimeout(() => {
            const contentText = this.content && this.content.nativeElement.innerText;
            this.showLabel = !contentText;
            this.isHasGroup = !!this.group;
            if (validator.isEmpty(this.label)) {
                this.label = contentText;
            }
            if (this.isHasGroup) {
                const update = () => {
                    if (this.group.disabled) {
                        this.disabled = this.group.disabled;
                    }
                    this.model = this.group.model;
                };
                update();
                this.group.subscriber.push(update);
            }
        });
        
    }
    
    ngOnChanges(): void {
    }
    
    handleInputChange(val: string): void {
        if (this.isHasGroup) {
            this.group.handleChange(val);
        }
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
