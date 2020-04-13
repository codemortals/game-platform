import { NgModule } from '@angular/core';
import { AuthenticatedDirective } from './directives/authenticated.directive';
import { BrandButtonModule, BrandInputModule } from '@brand';

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
    ]
})
export class CoreModule {
}
