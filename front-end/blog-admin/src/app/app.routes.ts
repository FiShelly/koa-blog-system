import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';

export const appRoutes = [
    {
        path: 'admin',
        loadChildren: './pages/pages.module#PagesModule'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {path: '**', redirectTo: 'login', pathMatch: 'full'},
];
