import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {EventBusService} from '../../shared-services/eventBus/event-bus.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-mask',
    templateUrl: './mask.component.html',
    styleUrls: ['./mask.component.scss'],
    animations: [
        trigger('state', [
            state('true', style({
                opacity: 0.5,
                display: 'block',
            })),
            state('false', style({
                opacity: 0,
                display: 'none',
            })),
            transition('* => *', animate(`250ms ease-in-out`)),
        ])
    ]
})
export class MaskComponent implements OnInit, AfterViewInit {
    
    @Input() zIndex: number = 10000;
    @Input() isShow: boolean = false;
    @Input() useWay: string = 'modal';
    
    constructor(
        private eventBus: EventBusService
    ) {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.eventBus.on('mask-show-change', (event) => {
            const data = event.data;
            if (event.data.useway === this.useWay) {
                if (data.zIndex) {
                    this.zIndex = data.zIndex;
                }
                if (this.isShow === data.isShow) {
                    return;
                }
                this.isShow = data.isShow;
            }
        });
    }
}
