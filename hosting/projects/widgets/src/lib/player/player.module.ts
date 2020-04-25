import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetPlayerComponent } from './player.component';

@NgModule({
    declarations: [
        WidgetPlayerComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        WidgetPlayerComponent,
    ],
})
export class WidgetPlayerModule {
}
