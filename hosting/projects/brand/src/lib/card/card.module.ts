import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandCardComponent } from './card.component';

@NgModule({
    declarations: [
        BrandCardComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BrandCardComponent,
    ],
})
export class BrandCardModule {}
