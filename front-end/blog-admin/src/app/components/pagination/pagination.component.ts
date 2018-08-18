import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {validator} from '../../shared-services/utils/normal';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    
    @Input() current: number = 1;
    @Input() total: number = 1;
    @Input() limit: number = 1;
    jumper: any;
    @Input() showLimit: boolean = true;
    
    @Output() changeLimit: EventEmitter<any> = new EventEmitter<any>();
    @Output() changePage: EventEmitter<any> = new EventEmitter<any>();
    
    constructor() {
    }
    
    ngOnInit() {
        this.checkData();
    }
    
    checkData() {
        if (this.limit < 1) {
            this.limit = 1;
        }
        if (this.total < 1) {
            this.total = 1;
        }
        if (this.current < 1) {
            this.current = 1;
        }
        if (this.current > this.total) {
            this.current = this.total;
        }
    }
    
    modifyJumper($event) {
        let val = this.jumper;
        if (!validator.isNumeric(val)) {
            val = '';
        } else if (val && val < 1) {
            val = 1;
        } else if (val && val > this.total) {
            val = this.total;
        }
        setTimeout(() => {
            this.jumper = val;
        });
    }
    
    modifyLimit($event) {
        this.changeLimit.emit(this.limit);
    }
    
    prePage($event) {
        if (this.current === 1) {
            return;
        }
        this.current -= 1;
        this.changePage.emit(this.current);
    }
    
    nextPage($event) {
        if (this.current >= this.total) {
            return;
        }
        this.current += 1;
        this.changePage.emit(this.current);
    }
    
    jumperPage($event) {
        if (!this.jumper) {
            return;
        }
        this.current = this.jumper;
        this.changePage.emit(this.current);
    }
}
