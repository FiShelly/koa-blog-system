import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyHeaderComponent} from './my-header/my-header.component';
import {MyImageInturnComponent} from './my-image-inturn/my-image-inturn.component';
import {MyTextInturnComponent} from './my-text-inturn/my-text-inturn.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule
    ],
    declarations: [
        MyHeaderComponent,
        MyImageInturnComponent,
        MyTextInturnComponent
    ],
    exports: [
        MyHeaderComponent,
        MyImageInturnComponent,
        MyTextInturnComponent
    ]
})
export class ComponentsModule {
}
