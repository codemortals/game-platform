import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { WelcomeComponent } from './welcome/welcome.component';

import { MainRouting } from './main.routing';

@NgModule({
    declarations: [
        WelcomeComponent,
    ],
    imports: [
        CoreModule,
        MainRouting,
    ],
})
export class MainModule {
}
