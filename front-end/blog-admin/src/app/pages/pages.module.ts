import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AboutComponent} from './about/about.component';
import {MaterialsComponent} from './materials/materials.component';
import {CommentsComponent} from './comments/comments.component';
import {TypetagComponent} from './typetag/typetag.component';
import {PostPublishComponent} from './post-publish/post-publish.component';
import {PostListComponent} from './post-list/post-list.component';
import {pagesRoutes} from './pages.routes';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(pagesRoutes)
    ],
    declarations: [
        AboutComponent,
        MaterialsComponent,
        CommentsComponent,
        TypetagComponent,
        PostPublishComponent,
        PostListComponent
    ],
    exports: [
    ]
})
export class PagesModule {
}
