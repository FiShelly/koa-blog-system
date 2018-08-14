import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared/guard/auth.guard';

export const appRoutes = [
    {
        path: 'admin',
        loadChildren: './pages/pages.module#PagesModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {path: '**', redirectTo: 'login', pathMatch: 'full'},
];
