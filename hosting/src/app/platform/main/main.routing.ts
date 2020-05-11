import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameListResolve } from '@core/resolves';

import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        resolve: {
            gameData: GameListResolve,
        },
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
export class MainRouting {
}
