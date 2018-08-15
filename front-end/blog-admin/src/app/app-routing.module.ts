import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared-services/guard/auth.guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const appRouting: Routes = [
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

@NgModule({
    imports: [
        RouterModule.forRoot(appRouting)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
