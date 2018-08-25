import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Event, EventBusService} from './shared-service/eventBus/event-bus.service';
import {MyMeta} from './models';
import {Meta, Title} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    constructor(
        private eventBus: EventBusService,
        private meta: Meta,
        private title: Title
    ) {

    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.eventBus.on('update-meta', (data: Event) => {
            const meta: MyMeta = data.data;
            this.title.setTitle(meta.title);
            Object.keys(meta).forEach((val: string) => {
                this.meta.updateTag({name: val, content: meta[val]});
                this.meta.updateTag({name: `og:${val}`, content: meta[val]});
            });
        });
    }
}
