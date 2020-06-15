import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetAvatarModule } from '@widgets/avatar/avatar.module';

import { WidgetPlayerComponent } from './player.component';

@NgModule({
    declarations: [
        WidgetPlayerComponent,
    ],
    imports: [
        CommonModule,
        WidgetAvatarModule,
    ],
    exports: [
        WidgetPlayerComponent,
    ],
})
export class WidgetPlayerModule {
}
