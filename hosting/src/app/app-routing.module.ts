import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyGuard } from './core/guards/verify.guard';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [ VerifyGuard ],
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
