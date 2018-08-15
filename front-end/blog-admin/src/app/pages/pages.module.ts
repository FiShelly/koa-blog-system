import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AboutComponent} from './about/about.component';
import {MaterialsComponent} from './materials/materials.component';
import {CommentsComponent} from './comments/comments.component';
import {TypetagComponent} from './typetag/typetag.component';
import {PostPublishComponent} from './post-publish/post-publish.component';
import {PostListComponent} from './post-list/post-list.component';
import {PagesRoutingModule} from './pages-routing.module';
import {IndexComponent} from './index/index.component';
import {ShareComponentsModule} from '../share-components/share-components.module';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        ShareComponentsModule
    ],
    declarations: [
        AboutComponent,
        MaterialsComponent,
        CommentsComponent,
        TypetagComponent,
        PostPublishComponent,
        PostListComponent,
        IndexComponent
    ],
    exports: []
})
export class PagesModule {
}
