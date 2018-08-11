import {AppComponent} from './app.component';

export const appRoutes = [
    {path: '**', redirectTo: '/post/list', pathMatch: 'full'},
];
