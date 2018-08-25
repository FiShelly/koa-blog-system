import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Event, EventBusService} from './shared-service/eventBus/event-bus.service';
import {MyMeta} from './models';
import {Meta, Title} from '@angular/platform-browser';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter, pairwise} from 'rxjs/operators';
import {StorageService} from './shared-service/utils/storage.service';
import {validator} from './shared-service/utils/normal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    constructor(
        private eventBus: EventBusService,
        private storageService: StorageService,
        private meta: Meta,
        private title: Title,
        private router: Router
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

        this.router.events
            .pipe(
                filter(e => e instanceof NavigationStart),
                pairwise()
            ).subscribe((e: any) => {
            const scrollMap = this.storageService.create(false).getItem('scroll-map') || {};
            const current: NavigationStart = e[0];
            scrollMap[current.url] = document.documentElement.scrollTop;
            this.storageService.create(false).setItem('scroll-map', scrollMap);
        });

        this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                pairwise()
            ).subscribe((e: any) => {
            const scrollMap = this.storageService.create(false).getItem('scroll-map') || {};
            const current: NavigationEnd = e[1];
            setTimeout(() => {
                document.documentElement.scrollTop = scrollMap[current.url];
            });
        });
    }
}
