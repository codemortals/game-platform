import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { PlayComponent } from './play/play.component';
import { LobbyComponent } from './lobby/lobby.component';
import { QuestionComponent } from './question/question.component';
import { ControlsComponent } from './controls/controls.component';
import { SummaryComponent } from './summary/summary.component';
import { WidgetsModule } from '@widgets/widgets.module';

@NgModule({
    declarations: [
        PlayComponent,
        LobbyComponent,
        QuestionComponent,
        ControlsComponent,
        SummaryComponent,
    ],
    imports: [
        CoreModule,
        WidgetsModule,
    ],
})
export class QuizModule {
}
