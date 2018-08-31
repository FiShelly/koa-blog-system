import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {TypetagComponent} from './typetag/typetag.component';
import {AboutComponent} from './about/about.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';
import {RouterModule} from '@angular/router';
import { Page404Component } from './page404/page404.component';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule,
        RouterModule
    ],
    declarations: [
        IndexComponent,
        ArticleListComponent,
        TypetagComponent,
        AboutComponent,
        ArticleDetailComponent,
        Page404Component
    ],
    exports: [
        IndexComponent,
        ArticleListComponent,
        TypetagComponent,
        AboutComponent,
        ArticleDetailComponent
    ]
})
export class PagesModule {
}
