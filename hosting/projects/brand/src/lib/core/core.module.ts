import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandOverlayComponent } from './components/overlay/overlay.component';

import { BrandInputDirective } from './directives/input.directive';

@NgModule({
    declarations: [
        BrandOverlayComponent,
        BrandInputDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BrandOverlayComponent,
        BrandInputDirective,
    ],
})
export class BrandCoreModule {
}
