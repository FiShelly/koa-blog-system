import {NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PLATFORM_ID, APP_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {SharedServiceModule} from './shared-service/shared-service.module';
import {SharedComponentsModule} from './shared-components/shared-components.module';
import {PagesModule} from './pages/pages.module';
import {StorageService} from './shared-service/utils/storage.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'blog-server'}),
        BrowserTransferStateModule,
        AppRoutingModule,
        HttpClientModule,
        SharedServiceModule,
        SharedComponentsModule,
        PagesModule,
        ServiceWorkerModule.register('/public/blog-index/browser/ngsw-worker.js', {enabled: environment.production, scope: '/'})
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string,
        private storageService: StorageService
    ) {
        const platform = isPlatformBrowser(platformId);
        this.storageService.create(true).setItem('is-browser', platform);
    }
}
