import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PLATFORM_ID, APP_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {SharedServiceModule} from './shared-service/shared-service.module';
import {SharedComponentsModule} from './shared-components/shared-components.module';
import {PagesModule} from './pages/pages.module';
import {StorageService} from './shared-service/utils/storage.service';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'blog-server'}),
        AppRoutingModule,
        HttpClientModule,
        SharedServiceModule,
        SharedComponentsModule,
        PagesModule
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
