import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventBusService} from './eventBus/event-bus.service';
import {HTTP_INTERCEPTOR_PROVIDERS} from './interceptor';
import {ModalService} from './modal/modal.service';
import {UserService} from './model/user.service';
import {StorageService} from './utils/storage.service';


@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ModalService,
        EventBusService,
        HTTP_INTERCEPTOR_PROVIDERS,
        UserService,
        StorageService
    ],
})
export class SharedModule {
}
