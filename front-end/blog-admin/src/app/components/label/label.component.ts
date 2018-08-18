import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {validator} from '../../shared-services/utils/normal';

@Component({
    selector: 'app-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
    
    @Input() text: any = '';
    @Input() suffix_icon: String = '';
    @Input() prefix_icon: String = '';
    @Input() isTrust: boolean = false;
    
    constructor(private sanitizer: DomSanitizer) {
    }
    
    ngOnInit() {
        if (this.isTrust) {
            if (!validator.hasHtml(this.text)) {
                this.text = `<span>${this.text}</span>`;
            }
            this.text = this.sanitizer.bypassSecurityTrustHtml(this.text);
        }
    }
    
}
