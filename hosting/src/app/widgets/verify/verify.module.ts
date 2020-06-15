import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetVerifyComponent } from './verify.component';

@NgModule({
    declarations: [
        WidgetVerifyComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        WidgetVerifyComponent,
    ],
})
export class WidgetVerifyModule {
}
