import { NgModule } from '@angular/core';

import { WidgetAccountModule } from './account/account.module';
import { WidgetChatModule } from './chat/chat.module';
import { WidgetLayoutModule } from './layout/layout.module';
import { WidgetLoginModule } from './login/login.module';
import { WidgetPlayerModule } from './player/player.module';

@NgModule({
    exports: [
        WidgetAccountModule,
        WidgetChatModule,
        WidgetLayoutModule,
        WidgetLoginModule,
        WidgetPlayerModule,
    ]
})
export class WidgetsModule {
}
