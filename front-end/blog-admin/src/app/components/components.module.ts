import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonHeaderComponent} from './common-header/common-header.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {InputComponent} from './input/input.component';
import {ButtonComponent} from './button/button.component';
import {TabViewComponent} from './tab-view/tab-view.component';
import {LabelComponent} from './label/label.component';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {RadioComponent} from './radio/radio.component';
import {TabBarComponent} from './tab-bar/tab-bar.component';
import {CheckboxGroupComponent} from './checkbox-group/checkbox-group.component';
import {SwitchComponent} from './switch/switch.component';
import {TextareaComponent} from './textarea/textarea.component';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {SelectComponent} from './select/select.component';
import {SelectOptionComponent} from './select-option/select-option.component';
import {TagComponent} from './tag/tag.component';
import {PaginationComponent} from './pagination/pagination.component';
import {DateTimePickerComponent} from './date-time-picker/date-time-picker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule
    ],
    declarations: [
        CommonHeaderComponent,
        LeftMenuComponent,
        InputComponent,
        ButtonComponent,
        TabViewComponent,
        LabelComponent,
        CheckboxComponent,
        RadioComponent,
        TabBarComponent,
        CheckboxGroupComponent,
        SwitchComponent,
        TextareaComponent,
        RadioGroupComponent,
        SelectComponent,
        SelectOptionComponent,
        TagComponent,
        PaginationComponent,
        DateTimePickerComponent
    ],
    exports: [
        CommonHeaderComponent,
        LeftMenuComponent,
        InputComponent,
        ButtonComponent,
        TabViewComponent,
        LabelComponent,
        CheckboxComponent,
        RadioComponent,
        TabBarComponent,
        CheckboxGroupComponent,
        SwitchComponent,
        TextareaComponent,
        RadioGroupComponent,
        SelectComponent,
        SelectOptionComponent,
        TagComponent,
        PaginationComponent,
        DateTimePickerComponent
    ]
})
export class ComponentsModule {
}
