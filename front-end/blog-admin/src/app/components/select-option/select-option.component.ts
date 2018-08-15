import {Component, AfterViewInit, EventEmitter, Input, OnInit, Optional, Output, ViewChild} from '@angular/core';
import {SelectComponent} from '../select/select.component';
import {validator} from '../../shared-services/utils/normal';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
    selector: 'app-select-option',
    templateUrl: './select-option.component.html',
    styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit, AfterViewInit {
    
    @ViewChild('content') content: any;
    
    @Input() disabled: Boolean = false;
    @Input() label: string;
    // @Input() model: any;
    contentText: string = '';
    selected: boolean = false;
    showLabel: Boolean = false;
    
    constructor(
        @Optional() private group: SelectComponent
    ) {
        if (!this.group) {
            console.warn('select option component need parents or container component');
            console.warn('please check');
            throw new Error('no-container');
        }
    }
    
    ngOnInit() {
        if (this.group) {
            this.group.disabledChange.subscribe(($e) => {
                this.disabled = $e.currentValue;
            });
        }
    }
    
    
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.contentText = this.content && this.content.nativeElement.innerText;
            this.showLabel = !this.contentText;
            
            if (validator.isEmpty(this.label)) {
                this.label = this.contentText;
            }
            const update = () => {
                if (this.group.disabled) {
                    this.disabled = this.group.disabled;
                }
                this.selected = this.label === this.group.model;
                this.selected && this.group.updateText(this.contentText);
            };
            update();
            this.group.subscriber.push(update);
        });
        
    }
    
    handleClick($event) {
        $event.stopPropagation();
        if (this.selected || this.disabled) {
            return;
        }
        this.selected = true;
        this.group.handleInputChange(this.label);
    }
    
}
