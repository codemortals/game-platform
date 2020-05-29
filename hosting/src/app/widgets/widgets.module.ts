import { NgModule } from '@angular/core';

import { WidgetAccountModule } from './account/account.module';
import { WidgetAvatarModule } from './avatar/avatar.module';
import { WidgetChatModule } from './chat/chat.module';
import { WidgetLayoutModule } from './layout/layout.module';
import { WidgetPlayerModule } from './player/player.module';
import { WidgetVerifyModule } from './verify/verify.module';

@NgModule({
    exports: [
        WidgetAccountModule,
        WidgetAvatarModule,
        WidgetChatModule,
        WidgetLayoutModule,
        WidgetPlayerModule,
        WidgetVerifyModule,
    ],
})
export class WidgetsModule {
}
