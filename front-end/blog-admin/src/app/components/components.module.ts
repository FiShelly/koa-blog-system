import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonHeaderComponent} from './common-header/common-header.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import { InputComponent } from './input/input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { FileButtonComponent } from './file-button/file-button.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { LabelComponent } from './label/label.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { SamplePagesComponent } from './sample-pages/sample-pages.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CommonHeaderComponent,
        LeftMenuComponent,
        InputComponent,
        DropdownComponent,
        ButtonComponent,
        TabViewComponent,
        FileButtonComponent,
        DateSelectorComponent,
        LabelComponent,
        CheckboxComponent,
        RadioComponent,
        TabBarComponent,
        SamplePagesComponent,
        CheckboxGroupComponent,
        SwitchComponent
    ],
    exports: [
        CommonHeaderComponent,
        LeftMenuComponent,
        InputComponent,
        DropdownComponent,
        ButtonComponent,
        TabViewComponent,
        FileButtonComponent,
        DateSelectorComponent,
        LabelComponent
    ]
})
export class ComponentsModule {
}
