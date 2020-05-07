import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    BrandButtonModule,
    BrandCardModule,
    BrandDropdownModule,
    BrandExpansionModule,
    BrandInputModule,
    BrandLabelModule,
    BrandToggleModule,
} from '@brand';

import {
    WidgetAccountModule,
    WidgetChatModule,
    WidgetLayoutModule,
    WidgetLoginModule,
    WidgetPlayerModule,
} from '@widget';

import { AccountDirective, AuthenticatedDirective, DynamicDirective } from './directives';

import {
    fas,
    faPlus,
    faGamepad,
} from '@fortawesome/free-solid-svg-icons';

import {
    fab,
    faFacebook,
} from '@fortawesome/free-brands-svg-icons';

@NgModule({
    declarations: [
        AccountDirective,
        AuthenticatedDirective,
        DynamicDirective,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        AccountDirective,
        AuthenticatedDirective,
        DynamicDirective,
        BrandButtonModule,
        BrandCardModule,
        BrandDropdownModule,
        BrandExpansionModule,
        BrandInputModule,
        BrandLabelModule,
        BrandToggleModule,
        WidgetAccountModule,
        WidgetChatModule,
        WidgetLoginModule,
        WidgetLayoutModule,
        WidgetPlayerModule,
    ],
})
export class CoreModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, fab);
        library.addIcons(
            faPlus,
            faGamepad,
            faFacebook,
        );
    }
}
