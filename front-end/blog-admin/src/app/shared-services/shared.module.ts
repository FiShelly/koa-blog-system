import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventBusService} from './eventBus/event-bus.service';
import {HTTP_INTERCEPTOR_PROVIDERS} from './interceptor';
import {ModalService} from './modal/modal.service';
import {UserService} from './model/user.service';
import {StorageService} from './utils/storage.service';
import {MaterialService} from './model/material.service';
import {TypetagService} from './model/typetag.service';
import {PostService} from './model/post.service';
import {CommentService} from './model/comment.service';
import {CgiService} from './model/cgi.service';


@NgModule({
        imports: [
            CommonModule,
        ],
        providers: [
            ModalService,
            EventBusService,
            HTTP_INTERCEPTOR_PROVIDERS,
            UserService,
            MaterialService,
            StorageService,
            TypetagService,
            PostService,
            CommentService,
            CgiService
        ],
})
export class SharedModule {
}
