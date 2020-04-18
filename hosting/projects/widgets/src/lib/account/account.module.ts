import { NgModule } from '@angular/core';
import { WidgetAccountComponent } from './account.component';
import { CommonModule } from '@angular/common';

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
