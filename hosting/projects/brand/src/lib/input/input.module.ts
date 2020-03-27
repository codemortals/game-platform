import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrandCoreModule } from '../core/core.module';
import { BrandInputComponent } from './input.component';

@NgModule({
  declarations: [
    BrandInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrandCoreModule,
  ],
  exports: [
    BrandInputComponent
  ]
})
export class BrandInputModule { }
