import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrandButtonModule, BrandCardModule, BrandInputModule } from '@brand';
import { WidgetAccountModule, WidgetChatModule, WidgetLoginModule, WidgetPlayerModule } from '@widget';

import { AuthenticatedDirective } from './directives/authenticated.directive';

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
        AuthenticatedDirective,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrandButtonModule,
        BrandCardModule,
        BrandInputModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        AuthenticatedDirective,
        BrandButtonModule,
        BrandCardModule,
        BrandInputModule,
        WidgetAccountModule,
        WidgetChatModule,
        WidgetLoginModule,
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
