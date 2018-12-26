import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {SharedModule} from './shared-services/shared.module';
import {SharedComponentsModule} from './shared-components/shared-components.module';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RedirectComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            headerName: 'x-csrf-token'
        }),
        AppRoutingModule,
        SharedModule,
        SharedComponentsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
