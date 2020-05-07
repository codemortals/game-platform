import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    fas,
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

import { BrandExpansionComponent } from './expansion.component';

@NgModule({
    declarations: [
        BrandExpansionComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    exports: [
        BrandExpansionComponent,
    ],
})
export class BrandExpansionModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(
            faChevronDown,
            faChevronUp,
        );
    }
}
