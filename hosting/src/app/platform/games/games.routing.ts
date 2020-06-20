import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameJoinResolve, GameRetrieveResolve } from '@core/resolves';
import { GameStatusGuard } from '@core/guards';

import { GameCreateComponent } from './create/create.component';
import { GameLobbyComponent } from './lobby/lobby.component';
import { GamePlayComponent } from './play/play.component';
import { GameResultsComponent } from './results/results.component';

const routes: Routes = [
    {
        path: 'create',
        component: GameCreateComponent,
    },
    {
        path: ':gameId/lobby',
        component: GameLobbyComponent,
        resolve: {
            playerJoin: GameJoinResolve,
            gameData: GameRetrieveResolve,
        },
        data: {
            states: [ 'CREATED', 'OPEN' ],
            next: 'play',
        },
        canActivate: [ GameStatusGuard ],
    },
    {
        path: ':gameId/play',
        component: GamePlayComponent,
        resolve: {
            playerJoin: GameJoinResolve,
            gameData: GameRetrieveResolve,
        },
        data: {
            states: [ 'IN_PROGRESS' ],
            next: 'results',
        },
        canActivate: [ GameStatusGuard ],
    },
    {
        path: ':gameId/results',
        component: GameResultsComponent,
        resolve: {
            gameData: GameRetrieveResolve,
        },
        data: {
            states: [ 'COMPLETE' ],
            next: 'lobby',
        },
        canActivate: [ GameStatusGuard ],
    },
    {
        path: ':gameId',
        redirectTo: ':gameId/lobby',
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
