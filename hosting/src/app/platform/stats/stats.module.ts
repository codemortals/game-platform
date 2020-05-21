import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { WidgetsModule } from '@widgets/widgets.module';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';

import { StatsRouting } from './stats.routing';

@NgModule({
    declarations: [
        LeaderboardComponent,
    ],
    imports: [
        CoreModule,
        WidgetsModule,
        StatsRouting,
    ],
    exports: [
        LeaderboardComponent,
    ],
})
export class StatsModule {
}
