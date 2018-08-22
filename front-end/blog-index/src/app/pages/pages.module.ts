import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {TypetagComponent} from './typetag/typetag.component';
import {AboutComponent} from './about/about.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import {SharedComponentsModule} from '../shared-components/shared-components.module';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentsModule
    ],
    declarations: [
        IndexComponent,
        ArticleListComponent,
        TypetagComponent,
        AboutComponent,
        ArticleDetailComponent
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
