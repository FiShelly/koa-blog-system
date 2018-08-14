import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {PagesModule} from './pages/pages.module';
import {RouterModule} from '@angular/router';
import {ModalService} from './shared/modal/modal.service';
import {CommonModule} from '@angular/common';
import {EventBusService} from './shared/eventBus/event-bus.service';
import {appRoutes} from './app.routes';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTOR_PROVIDERS} from './shared/interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [ModalService, EventBusService, HTTP_INTERCEPTOR_PROVIDERS],
    bootstrap: [AppComponent],
})
export class AppModule {
}
