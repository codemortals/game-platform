import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { WidgetsModule } from '@widgets/widgets.module';

import { WelcomeComponent } from './welcome/welcome.component';

import { MainRouting } from './main.routing';

@NgModule({
    declarations: [
        WelcomeComponent,
    ],
    imports: [
        CoreModule,
        WidgetsModule,
        MainRouting,
    ],
})
export class MainModule {
}
