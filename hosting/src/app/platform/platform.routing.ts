import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameListResolve } from '@core/resolves';

import { WelcomeComponent } from './welcome/welcome.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        resolve: {
            gameData: GameListResolve,
        },
    },
    {
        path: 'leaderboard',
        component: LeaderboardComponent,
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
export class PlatformRouting {
}
