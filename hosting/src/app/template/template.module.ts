import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';

@NgModule({
    declarations: [
        GameComponent,
        LobbyComponent,
    ],
    imports: [
        CoreModule,
    ]
})
export class TemplateModule {
}
