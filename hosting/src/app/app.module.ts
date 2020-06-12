import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CoreModule } from '@core/core.module';
import { WidgetsModule } from '@widgets/widgets.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout.component';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireFunctionsModule,
        AngularFirestoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        WidgetsModule,
    ],
    providers: [
        { provide: REGION, useValue: 'europe-west2' },
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
