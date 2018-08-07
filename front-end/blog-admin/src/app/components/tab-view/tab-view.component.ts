import {Component, Input, OnInit, Optional} from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';

@Component({
    selector: 'app-tab-view',
    templateUrl: './tab-view.component.html',
    styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit {
    @Input() disabled: Boolean = false;
    @Input() label: String;
    @Input() name: String;
    
    constructor(
        @Optional() private group: TabsComponent
    ) {
    }
    
    ngOnInit() {
    }
    
}
