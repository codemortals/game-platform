import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WidgetAccountComponent } from './account.component';

import {
    fas,
    faUser
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        WidgetAccountComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    exports: [
        WidgetAccountComponent,
    ],
})
export class WidgetAccountModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(
            faUser,
        );
    }
}
