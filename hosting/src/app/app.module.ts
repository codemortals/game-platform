import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { environment } from '../environments/environment.local';

import { BrandInputModule } from '@brand';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LeaderboardComponent,
    QuestionComponent,
    QuizComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrandInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
