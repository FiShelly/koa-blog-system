import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {RouterModule} from '@angular/router';
import {ModalService} from './services/modal/modal.service';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
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
    providers: [ModalService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
