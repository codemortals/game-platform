import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { WidgetsModule } from '@widgets/widgets.module';

import { PlayComponent } from './play/play.component';
import { LobbyComponent } from './lobby/lobby.component';
import { QuestionComponent } from './question/question.component';
import { ControlsComponent } from './controls/controls.component';
import { SummaryComponent } from './summary/summary.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
    declarations: [
        PlayComponent,
        LobbyComponent,
        QuestionComponent,
        ControlsComponent,
        SummaryComponent,
        LeaderboardComponent,
    ],
    imports: [
        CoreModule,
        WidgetsModule,
    ],
})
export class QuizModule {
}
