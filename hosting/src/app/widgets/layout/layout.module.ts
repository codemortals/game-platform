import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetColumnDirective } from './column.directive';
import { WidgetLayoutColumnComponent } from './layout-column.component';

@NgModule({
    declarations: [
        WidgetColumnDirective,
        WidgetLayoutColumnComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        WidgetColumnDirective,
        WidgetLayoutColumnComponent,
    ],
})
export class WidgetLayoutModule {
}
