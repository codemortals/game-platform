import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { PlatformRouting } from './platform.routing';

@NgModule({
    declarations: [
        WelcomeComponent,
        LeaderboardComponent,
    ],
    imports: [
        CoreModule,
        PlatformRouting,
    ],
})
export class PlatformModule {
}
