import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {validator} from '../../shared-services/utils/normal';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-table-shown-list',
    templateUrl: './table-shown-list.component.html',
    styleUrls: ['./table-shown-list.component.scss']
})
export class TableShownListComponent implements OnInit {
    
    @Input() format: object = {};
    @Input() operations: any = {};
    @Input() width: string = '1000';
    @Input() minHeight: string = '418';
    @Input() checkable: boolean = false;
    @Input() tableBorder: boolean = false;
    @Input() tdBorder: boolean = false;
    @Input() dataList: any[] = [];
    
    @Output() op: EventEmitter<any> = new EventEmitter<any>();
    
    
    constructor(
        private sanitizer: DomSanitizer
    ) {
    }
    
    ngOnInit() {
    }
    
    opClick($e, item, k) {
        $e.stopPropagation();
        this.op.emit({
            item: item,
            op: k.name
        });
    }
    
    getText(text, isForce) {
        if (!isForce) {
            return text;
        }
        if (!validator.hasHtml(text)) {
            text = `<span>${text}</span>`;
        }
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }
}
