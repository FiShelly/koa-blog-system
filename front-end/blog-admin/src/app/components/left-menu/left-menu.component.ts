import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from '../../models';
import {common} from '../../shared/utils/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
    
    @Input() menuData: MenuItem[];
    @Output() menuSelect: EventEmitter<any> = new EventEmitter<any>();
    
    constructor(private router: Router) {
        if (!this.menuData) {
            this.menuData = common.crcreateMenuDataeat();
        }
    }
    
    ngOnInit() {
    }
    
    clickHandle($e, item: MenuItem) {
        this.menuSelect.emit(item);
    }
    
}
