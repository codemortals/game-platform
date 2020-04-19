import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, FUNCTIONS_REGION } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GameCreateComponent } from './game/create/create.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        WelcomeComponent,
        GameCreateComponent,
        LeaderboardComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireFunctionsModule,
        AngularFirestoreModule,
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CoreModule,
    ],
    providers: [
        { provide: FUNCTIONS_REGION, useValue: 'europe-west2' },
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
