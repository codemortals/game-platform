import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandLabelComponent } from './label.component';

@NgModule({
    declarations: [
        BrandLabelComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BrandLabelComponent,
    ]
})
export class BrandLabelModule {
}
