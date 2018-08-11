import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventBusService} from './services/eventBus/event-bus.service';
import {ModalService} from './services/modal/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';
    check = ['checkBox1', 'checkBox2'];
    labels = ['checkBox1', 'checkBox2', 'checkBox3', 'checkBox4'];
    radio = 0;
    cbDisabled: Boolean = false;
    switch: Boolean = false;
    textarea = 'textarea';
    selected = 1;
    date = '2018-08-01 09:55:33';
    tab = 'three';
    
    constructor(
        private route: ActivatedRoute,
        private eventBus: EventBusService,
        private modalService: ModalService
    ) {
    }
    
    ngOnInit() {
        this.route.params.subscribe((params) => console.log(params));
    }
    
    
    clickEvent($event: any) {
        this.modalService.modal.prompt({
            input: {
                title: '警告',
                text: 'This is alert modal text content',
            },
            output: {
                okCallback: (v) => {
                    console.log('en', v);
                }
            }
        });
    }
    
    changeEvent($event: Event) {
        console.log('change event ', $event);
    }
}
