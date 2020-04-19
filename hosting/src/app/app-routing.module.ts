import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationResolve } from './core/services';

import { LayoutComponent } from './layout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameCreateComponent } from './game/create/create.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        resolve: { loggedIn: AuthenticationResolve },
        children: [
            {
                path: '',
                component: WelcomeComponent,
            },
            {
                path: 'game',
                children: [{
                    path: 'create',
                    component: GameCreateComponent
                }],
            },
            {
                path: 'leaderboard',
                component: LeaderboardComponent,
            },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
