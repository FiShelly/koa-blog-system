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
import {TabsComponent} from './tabs/tabs.component';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalAlertComponent} from './modal/modal-alert/modal-alert.component';
import {ModalHeaderComponent} from './modal/modal-header/modal-header.component';
import {ModalFooterComponent} from './modal/modal-footer/modal-footer.component';
import {MaskComponent} from './mask/mask.component';
import {ModalConfirmComponent} from './modal/modal-confirm/modal-confirm.component';
import {ModalPromptComponent} from './modal/modal-prompt/modal-prompt.component';
import {RouterModule} from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule
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
        TabsComponent,
        CheckboxGroupComponent,
        SwitchComponent,
        TextareaComponent,
        RadioGroupComponent,
        SelectComponent,
        SelectOptionComponent,
        TagComponent,
        PaginationComponent,
        DateTimePickerComponent,
        ModalAlertComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        MaskComponent,
        ModalConfirmComponent,
        ModalPromptComponent
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
        TabsComponent,
        CheckboxGroupComponent,
        SwitchComponent,
        TextareaComponent,
        RadioGroupComponent,
        SelectComponent,
        SelectOptionComponent,
        TagComponent,
        PaginationComponent,
        DateTimePickerComponent,
        MaskComponent
    ],
    entryComponents: [
        ModalAlertComponent,
        ModalConfirmComponent,
        ModalPromptComponent
    ]
})
export class ComponentsModule {
}
