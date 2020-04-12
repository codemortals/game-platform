import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandButtonComponent } from './button.component';

@NgModule({
    declarations: [
        BrandButtonComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BrandButtonComponent,
    ],
})
export class BrandButtonModule {}
