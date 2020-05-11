import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';

import { StatsRouting } from './stats.routing';

@NgModule({
    declarations: [
        LeaderboardComponent,
    ],
    imports: [
        CoreModule,
        StatsRouting,
    ],
})
export class StatsModule {
}
