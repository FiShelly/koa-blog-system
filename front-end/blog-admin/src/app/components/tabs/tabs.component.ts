import {Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, AfterViewInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {validator} from '../../shared-services/utils/normal';

export class TabItem {
    _id: string;
    label: string;
    name: string;
    disabled: boolean;
    
    constructor(_id, name, label, disabled) {
        this._id = _id;
        this.name = name;
        this.label = label;
        this.disabled = disabled;
    }
    
    update(name, label, disabled) {
        this.name = name;
        this.label = label;
        this.disabled = disabled;
    }
}

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TabsComponent),
        multi: true
    }],
})
export class TabsComponent implements OnInit, OnDestroy, ControlValueAccessor, AfterViewInit, OnChanges {
    @ViewChild('tabbar') tabBar: any;
    @Input() disabled: Boolean = false;
    @Input() model: any;
    
    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    _tabChange: EventEmitter<any> = new EventEmitter<any>();
    disabledChange: EventEmitter<any> = new EventEmitter<any>();
    tabMaps: any = {};
    tabItems: TabItem[] = [];
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        setTimeout(() => {
            if (validator.isEmpty(this.model)) {
                const firstData = this.tabItems.filter(val => !val.disabled);
                if (firstData.length > 0) {
                    this.handleChange(firstData[0].name);
                }
            } else {
                this._tabChange.emit(this.model);
            }
        });
    }
    
    ngOnDestroy() {
    }
    
    setTabItemData(_id, name, label, disabled) {
        // disabled = this.disabled ? true : disabled;
        let item = this.tabMaps[_id];
        if (item) {
            item.update(name, label, disabled);
        } else {
            item = new TabItem(_id, name, label, disabled);
            this.tabMaps[_id] = item;
        }
        this.tabItems = Object.values(this.tabMaps);
    }
    
    ngOnChanges(changes): void {
        if (changes.hasOwnProperty('disabled')) {
            this.disabledChange.emit(changes['disabled']);
        }
    }
    
    click2ChangeTab($e, item) {
        $e.stopPropagation();
        if (item.disabled || item.name === this.model) {
            return;
        }
        this.handleChange(item.name);
    }
    
    handleChange(val: string): void {
        this.model = val;
        this.modelChange.emit(val);
        this._tabChange.emit(val);
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
