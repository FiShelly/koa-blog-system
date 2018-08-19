import {
    AfterViewInit,
    Component,
    ElementRef,
    Renderer2,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    OnDestroy
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true
    }],
    animations: [
        trigger('state', [
            state('true', style({
                opacity: 1,
                height: '*',
                display: 'block',
            })),
            state('false', style({
                opacity: 0,
                height: 0,
                display: 'none',
            })),
            transition('* => *', animate(`250ms ease-in-out`)),
        ])
    ]
})
export class SelectComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, AfterViewInit {
    @ViewChild('frame') frame: any;
    @ViewChild('select') select: any;
    
    @Input() disabled: Boolean = false;
    @Input() model: any = '';
    text: any = '';
    @Input() placeholder: string = '请选择';
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    isActived: boolean = false;
    disabledChange: EventEmitter<any> = new EventEmitter<any>();
    subscriber: Function[] = [];
    globalListener: Function;
    
    private $body: Element = null;
    
    constructor(
        private $renderer2: Renderer2
    ) {
        this.$body = document.querySelector('body');
    }
    
    private computePosition() {
        const timer = setTimeout(() => {
            const elFrame = this.frame.nativeElement;
            this.$body.appendChild(elFrame);
            const rect = this.select.nativeElement.getBoundingClientRect();
            const dropX = Math.round(rect.left) + (window.scrollX || window.pageXOffset);
            const dropY = Math.round(rect.top) + 42 + (window.scrollY || window.pageYOffset);
            this.$renderer2.setStyle(elFrame, 'left', `${dropX}px`);
            this.$renderer2.setStyle(elFrame, 'top', `${dropY}px`);
            clearTimeout(timer);
        });
    }
    
    ngOnInit() {
        this.globalListener = this.$renderer2.listen('document', 'click', () => {
            this.isActived && this.toggleDrop();
        });
        // this.$renderer2.setStyle()
    }
    
    ngOnChanges(changes): void {
        if (changes.hasOwnProperty('disabled')) {
            this.disabledChange.emit(changes['disabled']);
        }
    }
    
    ngOnDestroy() {
        this.globalListener && this.globalListener();
        this.$renderer2.removeChild(this.$body, this.frame.nativeElement);
    }
    
    ngAfterViewInit(): void {
        this.subscriber.forEach(sub => sub());
        this.computePosition();
    }
    
    toggleDrop($e?: Event) {
        if (this.disabled) {
            return;
        }
        $e && $e.stopPropagation();
        this.computePosition();
        this.isActived = !this.isActived;
    }
    
    updateText(label: string) {
        this.text = label;
    }
    
    handleInputChange(val: any): void {
        this.model = val;
        this.controlChange(val);
        this.subscriber.forEach(sub => sub());
        this.toggleDrop();
        this.modelChange.emit(val);
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
