import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    fas,
    faChevronUp,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import { BrandCoreModule } from '../core/core.module';
import { BrandLabelModule } from '../label/label.module';

import { BrandDropdownComponent } from './dropdown.component';

@NgModule({
    declarations: [
        BrandDropdownComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,
        FontAwesomeModule,
        BrandCoreModule,
        BrandLabelModule,
    ],
    exports: [
        BrandDropdownComponent,
    ]
})
export class BrandDropdownModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(
            faChevronUp,
            faChevronDown,
        );
    }
}
