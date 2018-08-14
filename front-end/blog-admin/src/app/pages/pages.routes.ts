import {PostPublishComponent} from './post-publish/post-publish.component';
import {PostListComponent} from './post-list/post-list.component';
import {AboutComponent} from './about/about.component';
import {TypetagComponent} from './typetag/typetag.component';
import {MaterialsComponent} from './materials/materials.component';
import {CommentsComponent} from './comments/comments.component';
import {IndexComponent} from './index/index.component';
import {AuthGuard} from '../shared/guard/auth.guard';


export const pagesRoutes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            {path: '', redirectTo: 'post/list', pathMatch: 'full'},
            {path: 'post/publish', component: PostPublishComponent},
            {path: 'post/publish/:id', component: PostPublishComponent},
            {path: 'post/list', component: PostListComponent},
            {path: 'about', component: AboutComponent},
            {path: 'typetag', component: TypetagComponent},
            {path: 'materials', component: MaterialsComponent},
            {path: 'comments', component: CommentsComponent}
        ]
    },
];
