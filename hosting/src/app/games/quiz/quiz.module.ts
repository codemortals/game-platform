import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { PlayComponent } from './play/play.component';
import { LobbyComponent } from './lobby/lobby.component';

@NgModule({
    declarations: [
        PlayComponent,
        LobbyComponent,
    ],
    imports: [
        CoreModule,
    ]
})
export class QuizModule {
}
