import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { GameCreateComponent } from './create/create.component';
import { GameLobbyComponent } from './lobby/lobby.component';

import { GameRouting } from './game.routing';

@NgModule({
    declarations: [
        GameCreateComponent,
        GameLobbyComponent,
    ],
    imports: [
        CoreModule,
        GameRouting,
    ],
})
export class GameModule {
}
