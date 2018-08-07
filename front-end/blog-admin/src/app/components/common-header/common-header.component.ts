import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../../models';

@Component({
    selector: 'app-common-header',
    templateUrl: './common-header.component.html',
    styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit {
    
    @Input() author: Author = new Author();
    @Input() mainLink: String = 'http://www.fishelly.top';
    
    constructor() {
        this.author.name = 'Fishelly';
        this.author.headImg = '';
    }
    
    ngOnInit() {
    }
    
}
