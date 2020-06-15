import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    fas,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { BrandToggleComponent } from './toggle.component';

@NgModule({
    declarations: [
        BrandToggleComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
    ],
    exports: [
        BrandToggleComponent,
    ],
})
export class BrandToggleModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(
            faCheck,
        );
    }
}
