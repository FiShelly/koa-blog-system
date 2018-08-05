import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    OnDestroy,
    Renderer2,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';
import * as moment from 'moment';
import {validator} from '../../shared/utils/normal';
import {a, st} from '@angular/core/src/render3';

export type DateRowItem = {
    day: number,
    type: String,
    isCurrent: boolean
};
export type DateRow = DateRowItem[];

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePickerComponent),
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
export class DatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, AfterViewInit {
    @ViewChild('frame') frame: any;
    
    @Input() disabled: Boolean = false;
    @Input() model: any = '';
    @Input() format: string = 'YYYY-MM-DD';
    @Input() placeholder: string = '请选择';
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    
    dateObj: any = {};
    text: string = '';
    isActived: boolean = false;
    disabledChange: EventEmitter<any> = new EventEmitter<any>();
    globalListener: Function;
    dateArray: DateRow[] = [];
    
    private MONTHSTEP: any = {
        lastMonth: -1,
        currentMonth: 0,
        nextMonth: 1
    };
    private $body: Element = null;
    
    constructor(
        private $el: ElementRef,
        private $renderer2: Renderer2
    ) {
        this.$body = document.querySelector('body');
    }
    
    private computePosition() {
        const timer = setTimeout(() => {
            const elFrame = this.frame.nativeElement;
            this.$body.appendChild(elFrame);
            const rect = this.$el.nativeElement.getBoundingClientRect();
            const dropX = Math.round(rect.left) + (window.scrollX || window.pageXOffset);
            const dropY = Math.round(rect.top) + 32 + (window.scrollY || window.pageYOffset);
            this.$renderer2.setStyle(elFrame, 'left', `${dropX}px`);
            this.$renderer2.setStyle(elFrame, 'top', `${dropY}px`);
            clearTimeout(timer);
        });
    }
    
    private initDateObj(args?: any) {
        let m = null;
        if (validator.isNumeric(args)) {
            m = moment.unix(args);
        } else if (args instanceof Array && args.length === 3) {
            m = moment(`${args[0]}-${args[1] - 1}-${args[2]}`);
        } else if (typeof args === 'object' && args) {
            m = moment({year: args.year, month: args.month - 1, date: args.date});
        } else {
            args = args || '';
            m = moment(args);
        }
        if (args) {
            this.text = m.format(this.format);
        }
        this.text = m.format(this.format);
        this.dateArray = [];
        const dateObj = this.dateObj;
        dateObj.year = m.year();
        dateObj.month = m.month() + 1;
        dateObj.date = m.date();
        dateObj.day = m.date(1).day();
        dateObj.currentMonthDay = m.daysInMonth();
        dateObj.lastMonth = m.subtract(1, 'months').month() + 1;
        dateObj.lastMonthDay = m.daysInMonth();
        
        let temp = 1;
        let lastAndCurrentStep = dateObj.day - 1;
        let isNotFrist = !!dateObj.day;
        if (!isNotFrist) {
            temp = dateObj.lastMonthDay;
        } else {
            temp = 1;
        }
        [0, 1, 2, 3, 4, 5].forEach(val => {
            const array: DateRow = [];
            for (let i = 0; i < 7; i++) {
                if (!isNotFrist) {
                    array[6 - i] = {day: temp, type: 'lastMonth', isCurrent: false};
                    temp -= 1;
                } else {
                    if (lastAndCurrentStep >= 0) {
                        array[i] = {day: dateObj.lastMonthDay - lastAndCurrentStep, type: 'lastMonth', isCurrent: false};
                        lastAndCurrentStep -= 1;
                    } else if (temp <= dateObj.currentMonthDay) {
                        array[i] = {day: temp, type: 'currentMonth', isCurrent: temp === dateObj.date};
                        temp += 1;
                    } else {
                        array[i] = {day: (temp++) - dateObj.currentMonthDay, type: 'nextMonth', isCurrent: false};
                    }
                }
            }
            if (!isNotFrist) {
                isNotFrist = true;
                temp = 1;
            }
            this.dateArray.push(array);
        });
    }
    
    ngOnInit() {
        this.computePosition();
        this.initDateObj(this.model);
        this.globalListener = this.$renderer2.listen('document', 'click', () => {
            this.isActived && this.toggleDrop();
        });
    }
    
    ngOnChanges(changes): void {
        if (changes.hasOwnProperty('disabled')) {
            this.disabledChange.emit(changes['disabled']);
        }
    }
    
    ngAfterViewInit(): void {
    }
    
    
    ngOnDestroy() {
        this.globalListener && this.globalListener();
        this.$renderer2.removeChild(this.$body, this.frame.nativeElement);
    }
    
    
    toggleDrop($e?: Event) {
        if (this.disabled) {
            return;
        }
        $e && $e.stopPropagation();
        this.isActived = !this.isActived;
    }
    
    updateText() {
        const args = this.dateObj;
        const m = moment({year: args.year, month: args.month - 1, date: args.date});
    }
    
    clickSelectDate($e, item) {
        $e.stopPropagation();
        const step = this.MONTHSTEP[item.type];
        this.dateObj.month = this.dateObj.month + step;
        this.dateObj.date = item.day;
        this.handleInputChange(this.dateObj);
        this.initDateObj(this.dateObj);
        this.toggleDrop($e);
    }
    
    clickHandler($e, type, step) {
        $e.stopPropagation();
        this.dateObj[type] += step;
        this.initDateObj(this.dateObj);
    }
    
    handleInputChange(args: any): void {
        const time = moment({year: args.year, month: args.month - 1, date: args.date}).unix();
        this.model = time;
        this.controlChange(time);
        this.modelChange.emit(time);
        // this.toggleDrop();
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
