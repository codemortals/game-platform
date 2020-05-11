import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameJoinResolve, GameRetrieveResolve } from '@core/resolves';

import { GameCreateComponent } from './create/create.component';
import { GameLobbyComponent } from './lobby/lobby.component';
import { GamePlayComponent } from './play/play.component';

const routes: Routes = [
    {
        path: 'create',
        component: GameCreateComponent,
    },
    {
        path: ':gameId/lobby',
        component: GameLobbyComponent,
        resolve: {
            gameData: GameJoinResolve,
        },
    },
    {
        path: ':gameId/play',
        component: GamePlayComponent,
        resolve: {
            gameData: GameRetrieveResolve,
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
export class GamesRouting {
}
