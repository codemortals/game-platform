import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandInputDirective } from './directives/input.directive';

@NgModule({
    declarations: [
        BrandInputDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BrandInputDirective,
    ],
})
export class BrandCoreModule {
}
