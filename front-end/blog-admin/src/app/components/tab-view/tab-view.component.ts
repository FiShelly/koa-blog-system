import {
    Component, EventEmitter, Input, OnInit, OnChanges, OnDestroy, Optional, Renderer2, ViewChild
} from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';
import {validator, util} from '../../shared-services/utils/normal';

@Component({
    selector: 'app-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('view') tabView: any;
    _label: string;
    _name: string;
    _id: string = util.randomString();
    @Input() disabled: Boolean = false;
    
    @Input() set label(val: string) {
        if (validator.isEmpty(val)) {
            throw Error('必须输入该值');
        }
        this._label = val;
    }
    
    @Input() set name(val: string) {
        if (validator.isEmpty(val)) {
            throw Error('必须输入该值');
        }
        this._name = val;
    }
    
    constructor(
        @Optional() private group: TabsComponent,
        private $renderer2: Renderer2
    ) {
        this.group.disabledChange.subscribe(($e) => {
            if (this.disabled !== $e.currentValue) {
                this.disabled = $e.currentValue;
            }
            this.computeData();
        });
        this.group._tabChange.subscribe($e => {
            if (this.disabled) {
                return;
            }
            this.setTabDisplay($e);
        });
    }
    
    ngOnInit() {
        if (!this.group) {
            throw Error('No tab contianer.');
        }
        this.computeData();
    }
    
    ngOnDestroy() {
        this.group._tabChange.unsubscribe();
        this.group.disabledChange.unsubscribe();
    }
    
    ngOnChanges(changes): void {
        if (changes.hasOwnProperty('disabled')) {
            this.disabled = changes['disabled'].currentValue;
            this.computeData();
        }
    }
    
    setTabDisplay($e) {
        this.$renderer2.setStyle(this.tabView.nativeElement,
            'display', $e === this._name ? 'block' : 'none');
    }
    
    computeData() {
        this.group.setTabItemData(this._id, this._name, this._label, this.disabled);
    }
    
}
