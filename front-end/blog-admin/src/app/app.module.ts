import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forRoot([
            {path: 'index', component: AppComponent},
            {path: 'post/list/:id', component: AppComponent},
            {path: 'about/:id', component: AppComponent},
            {path: '**', redirectTo: '/index', pathMatch: 'full'},
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
