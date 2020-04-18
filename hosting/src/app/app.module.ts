import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GameComponent } from './game.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        WelcomeComponent,
        LeaderboardComponent,
        QuizComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireFunctionsModule,
        AngularFirestoreModule,
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CoreModule
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
