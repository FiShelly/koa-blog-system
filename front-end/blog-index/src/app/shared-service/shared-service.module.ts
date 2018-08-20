import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventBusService} from './eventBus/event-bus.service';
import {HTTP_INTERCEPTOR_PROVIDERS} from './interceptor';
import {UserService} from './model/user.service';
import {StorageService} from './utils/storage.service';
import {TypetagService} from './model/typetag.service';
import {PostService} from './model/post.service';
import {CommentService} from './model/comment.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        EventBusService,
        HTTP_INTERCEPTOR_PROVIDERS,
        UserService,
        StorageService,
        TypetagService,
        PostService,
        CommentService
    ],
    declarations: []
})
export class SharedServiceModule {
}
