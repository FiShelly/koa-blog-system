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
import {validator} from '../../shared-services/utils/normal';

export type DateRowItem = {
    day: number,
    type: String,
    isCurrent: boolean
};
export type DateRow = DateRowItem[];

@Component({
    selector: 'app-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DateTimePickerComponent),
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
export class DateTimePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, AfterViewInit {
    @ViewChild('frame') frame: any;
    
    @Input() disabled: Boolean = false;
    @Input() model: any = '';
    @Input() dateFormat: string = 'YYYY-MM-DD';
    @Input() timeFormat: string = 'HH:mm:ss';
    
    @Input() placeholder: string = '请选择';
    @Input() showTime: boolean = true;
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
    
    static Compare(val: number, max: number, min: number = 0): number {
        if (val < min) {
            return min;
        } else if (val >= max) {
            return max;
        }
        return val;
    }
    
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
        } else if (typeof args === 'object' && args) {
            m = moment({
                year: args.year,
                month: args.month - 1,
                date: args.date,
                hour: args.hour || 0,
                minute: args.minute || 0,
                second: args.second
            });
        } else if (args) {
            m = moment(args);
        } else {
            m = moment();
        }
        
        if (args) {
            this.text = m.format(this.showTime ? `${this.dateFormat} ${this.timeFormat}` : this.dateFormat);
        }
        this.dateArray = [];
        const dateObj = this.dateObj;
        dateObj.hour = m.hour();
        dateObj.minute = m.minute();
        dateObj.second = m.second();
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
        this.computePosition();
        this.isActived = !this.isActived;
    }
    
    clickSelectDate($e, item) {
        $e.stopPropagation();
        const step = this.MONTHSTEP[item.type];
        this.dateObj.month = this.dateObj.month + step;
        this.dateObj.date = item.day;
        this.handleInputChange(this.dateObj);
    }
    
    clickToNowTime($e) {
        $e.stopPropagation();
        this.initDateObj();
    }
    
    clickOk($e) {
        $e.stopPropagation();
        this.handleInputChange(this.dateObj);
    }
    
    clickHandler($e, type, step) {
        $e.stopPropagation();
        this.dateObj[type] += step;
        this.initDateObj(this.dateObj);
    }
    
    timeInputHandler($e, type) {
        if (!validator.isNumeric($e)) {
            $e = Number.parseInt($e);
            if (!validator.isNumeric($e)) {
                $e = 0;
            }
            this.dateObj[type] = $e;
        }
        this.setRightData(type);
        if (['year', 'month', 'date'].includes(type)) {
            this.initDateObj(this.dateObj);
        }
    }
    
    private setRightData(type) {
        const dateObj = this.dateObj;
        let max = Infinity, min = 0;
        if (type === 'hour') {
            max = 23;
        } else if (type === 'second' || type === 'minute') {
            max = 59;
        } else if (type === 'year') {
            min = 1;
        } else if (type === 'month') {
            max = 12;
            min = 1;
        } else {
            min = 1;
        }
        dateObj[type] = DateTimePickerComponent.Compare(Number.parseInt(dateObj[type]), max, min);
        if (type === 'month' || type === 'date') {
            const m = moment({year: dateObj.year, month: dateObj.month - 1});
            max = m.daysInMonth();
            dateObj['date'] = DateTimePickerComponent.Compare(Number.parseInt(dateObj['date']), max, 1);
        }
    }
    
    handleInputChange(args: any): void {
        const momentObj: any = {
            year: args.year,
            month: args.month - 1,
            date: args.date,
        };
        if (this.showTime) {
            momentObj.hour = args.hour || 0;
            momentObj.minute = args.minute || 0;
            momentObj.second = args.second;
        }
        const time = moment(momentObj).unix();
        this.model = time;
        this.controlChange(time);
        this.modelChange.emit(time);
        this.initDateObj(this.dateObj);
        this.toggleDrop();
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
