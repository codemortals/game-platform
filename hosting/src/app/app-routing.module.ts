import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationResolve } from './core/services/authentication.resolve';

import { GameComponent } from './game.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuizComponent } from './quiz/quiz.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
    {
        path: '',
        component: GameComponent,
        resolve: { loggedIn: AuthenticationResolve },
        children: [
            {
                path: '',
                component: WelcomeComponent,
            },
            {
                path: 'quiz',
                component: QuizComponent,
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
