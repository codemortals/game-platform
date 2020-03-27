import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [{
  path: '',
  component: WelcomeComponent,
},
{
  path: 'quiz',
  component: QuizComponent,
},
{
  path: 'question',
  component: QuestionComponent,
},
{
  path: 'leaderboard',
  component: LeaderboardComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
