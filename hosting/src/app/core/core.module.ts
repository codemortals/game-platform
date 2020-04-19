import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrandButtonModule, BrandCardModule, BrandInputModule } from '@brand';
import { WidgetAccountModule, WidgetLoginModule } from '@widget';

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
        BrandButtonModule,
        BrandCardModule,
        BrandInputModule,
    ],
    exports: [
        FontAwesomeModule,
        AuthenticatedDirective,
        BrandButtonModule,
        BrandCardModule,
        BrandInputModule,
        WidgetAccountModule,
        WidgetLoginModule,
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
