import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    AccountDirective,
    AuthenticatedDirective,
    DynamicDirective,
    HostDirective,
    MarkdownDirective,
} from './directives';
import { CountPipe } from './pipes';

import {
    BrandButtonModule,
    BrandCardModule,
    BrandDropdownModule,
    BrandExpansionModule,
    BrandInputModule,
    BrandLabelModule,
    BrandNotificationModule,
    BrandToggleModule,
} from '@brand';

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
        HostDirective,
        MarkdownDirective,
        CountPipe,
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
        HostDirective,
        MarkdownDirective,
        CountPipe,

        BrandButtonModule,
        BrandCardModule,
        BrandDropdownModule,
        BrandExpansionModule,
        BrandInputModule,
        BrandLabelModule,
        BrandNotificationModule,
        BrandToggleModule,
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
