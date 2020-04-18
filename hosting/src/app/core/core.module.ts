import { NgModule } from '@angular/core';

import { BrandButtonModule, BrandInputModule } from '@brand';
import { WidgetAccountModule, WidgetLoginModule } from '@widget';

import { AuthenticatedDirective } from './directives/authenticated.directive';

@NgModule({
    declarations: [
        AuthenticatedDirective,
    ],
    imports: [
        BrandButtonModule,
        BrandInputModule,
    ],
    exports: [
        AuthenticatedDirective,
        BrandButtonModule,
        BrandInputModule,
        WidgetAccountModule,
        WidgetLoginModule,
    ]
})
export class CoreModule {
}
