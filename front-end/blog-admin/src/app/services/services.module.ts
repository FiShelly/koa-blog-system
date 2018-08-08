import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal/modal.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalService
    ],
    exports: [
        ModalService
    ]
})
export class ServicesModule {
}
