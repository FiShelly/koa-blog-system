import {
    Component,
    EventEmitter,
    forwardRef,
    Host,
    Inject,
    AfterViewInit,
    OnChanges,
    Input,
    OnInit,
    Output,
    ViewChild,
    Optional, HostListener
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CheckboxGroupComponent} from '../checkbox-group/checkbox-group.component';
import {validator} from '../../shared-services/utils/normal';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }],
})
export class CheckboxComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {
    @ViewChild('content') content: any;

    @Input() disabled: Boolean = false;
    @Input() label: String;
    @Input() model: any;
    @Input() indeterminate: Boolean = false;
    @Input() checked: Boolean = false;
    @Input() name: String;
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    showLabel: Boolean = false;
    private isHasGroup = false;

    constructor(@Optional() private group: CheckboxGroupComponent) {

    }

    isChecked() {
        if (this.isHasGroup) {
            this.model = this.group.model.includes(this.label);
            return this.model;
        }
        if (typeof this.model === 'boolean') {
            return this.model;
        }
        return this.label === this.model;
    }

    ngOnInit() {
        if (this.group) {
            this.group.disabledChange.subscribe(($e) => {
                this.disabled = $e.currentValue;
            });
            this.group.inputChange.subscribe(($e) => {
                this.checked = this.isChecked();
            })
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
            if (this.isHasGroup && this.group.disabled) {
                this.disabled = this.group.disabled;
            }
            this.checked = this.isChecked();
        });
    }

    ngOnChanges(): void {
    }

    handleInputChange(val: string): void {
        if (this.isHasGroup) {
            this.group.handleChange({
                checked: val,
                label: this.label
            });
        }
        this.model = val;
        this.checked = this.isChecked();
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
