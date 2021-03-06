import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './pages/index/index.component';
import {ArticleListComponent} from './pages/article-list/article-list.component';
import {ArticleDetailComponent} from './pages/article-detail/article-detail.component';
import {TypetagComponent} from './pages/typetag/typetag.component';
import {AboutComponent} from './pages/about/about.component';
import {Page404Component} from './pages/page404/page404.component';


const routes: Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'article', component: ArticleListComponent},
    {path: 'article/:id', component: ArticleDetailComponent},
    {path: 'typetag', component: TypetagComponent},
    {path: 'about', component: AboutComponent},
    {path: '404', component: Page404Component},
    {path: '**', redirectTo: '/404', pathMatch: 'full'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
