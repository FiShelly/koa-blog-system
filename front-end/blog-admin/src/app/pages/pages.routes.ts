import {PostPublishComponent} from './post-publish/post-publish.component';
import {PostListComponent} from './post-list/post-list.component';
import {AboutComponent} from './about/about.component';
import {TypetagComponent} from './typetag/typetag.component';
import {MaterialsComponent} from './materials/materials.component';
import {CommentsComponent} from './comments/comments.component';


export const pagesRoutes = [
    {path: 'post/publish', component: PostPublishComponent},
    {path: 'post/list', component: PostListComponent},
    {path: 'about', component: AboutComponent},
    {path: 'typetag', component: TypetagComponent},
    {path: 'materials', component: MaterialsComponent},
    {path: 'comments', component: CommentsComponent}
];
