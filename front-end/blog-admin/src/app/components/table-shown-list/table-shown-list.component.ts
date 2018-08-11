import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-table-shown-list',
    templateUrl: './table-shown-list.component.html',
    styleUrls: ['./table-shown-list.component.scss']
})
export class TableShownListComponent implements OnInit {
    
    @Input() format: object = {};
    @Input() operations: any = {};
    @Input() width: string = '1000';
    @Input() minHeight: string = '518';
    @Input() checkable: boolean = false;
    @Input() tableBorder: boolean = false;
    @Input() tdBorder: boolean = false;
    dataList: any[] = [];
    
    @Output() op: EventEmitter<any> = new EventEmitter<any>();
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    opClick($e, item, k) {
        $e.stopPropagation();
        this.op.emit({
            item: item,
            op: k
        });
    }
}
