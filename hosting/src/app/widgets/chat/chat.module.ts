import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WidgetAvatarModule } from '@widgets/avatar/avatar.module';

import { WidgetChatComponent } from './chat.component';
import { WidgetChatDirective } from './chat.directive';

import {
    fas,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        WidgetChatComponent,
        WidgetChatDirective,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        WidgetAvatarModule,
    ],
    exports: [
        WidgetChatComponent,
    ],
})
export class WidgetChatModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIcons(
            faPaperPlane,
        );
    }
}
