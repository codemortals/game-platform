import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WidgetAvatarComponent } from './avatar.component';

import {
    fas,
    faUser
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        WidgetAvatarComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    exports: [
        WidgetAvatarComponent,
    ]
})
export class WidgetAvatarModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(
            faUser,
        );
    }
}
