import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { GameCreateComponent } from './create/create.component';
import { GameLobbyComponent } from './lobby/lobby.component';
import { GamePlayComponent } from './play/play.component';

import { GamesRouting } from './games.routing';

@NgModule({
    declarations: [
        GameCreateComponent,
        GameLobbyComponent,
        GamePlayComponent,
    ],
    imports: [
        CoreModule,
        GamesRouting,
    ],
})
export class GamesModule {
}
