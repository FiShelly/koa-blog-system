import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '../components/components.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
    ],
    declarations: []
})
export class ShareComponentsModule {
}
