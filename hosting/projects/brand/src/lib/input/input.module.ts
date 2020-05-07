import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrandCoreModule } from '../core/core.module';
import { BrandLabelModule } from '../label/label.module';

import { BrandInputComponent } from './input.component';

@NgModule({
    declarations: [
        BrandInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrandCoreModule,
        BrandLabelModule,
    ],
    exports: [
        BrandInputComponent,
    ],
})
export class BrandInputModule {}
