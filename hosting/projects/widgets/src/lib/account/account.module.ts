import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetAccountComponent } from './account.component';

@NgModule({
    declarations: [
        WidgetAccountComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        WidgetAccountComponent,
    ],
})
export class WidgetAccountModule {
}
