import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {PagesModule} from './pages/pages.module';
import {RouterModule} from '@angular/router';
import {ModalService} from './services/modal/modal.service';
import {CommonModule} from '@angular/common';
import {EventBusService} from './services/eventBus/event-bus.service';
import {appRoutes} from './app.routes';
import { LoginComponent } from './login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ComponentsModule,
        PagesModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [ModalService, EventBusService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
