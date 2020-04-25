import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameRetrieveResolve, PlayerJoinResolve } from '@core/resolves';

import { GameCreateComponent } from './create/create.component';
import { GameLobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
    {
        path: 'create',
        component: GameCreateComponent,
    },
    {
        path: 'lobby/:gameId',
        component: GameLobbyComponent,
        resolve: {
            gameData: GameRetrieveResolve,
            playerJoin: PlayerJoinResolve,
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class GameRouting {
}
