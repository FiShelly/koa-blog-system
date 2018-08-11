import {AppComponent} from './app.component';

export const appRoutes = [
    {path: 'index', component: AppComponent},
    {path: '**', redirectTo: '/index', pathMatch: 'full'},
];
