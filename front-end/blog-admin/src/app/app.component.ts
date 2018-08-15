import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {EventBusService} from './shared-services/eventBus/event-bus.service';
import {ModalService} from './shared-services/modal/modal.service';
import {filter, pairwise} from 'rxjs/operators';

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
        private modalService: ModalService,
        private router: Router
    ) {
    }
    
    ngOnInit() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd),
                pairwise()).subscribe(e => {
            this.eventBus.emit('refresh-user');
        });
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
