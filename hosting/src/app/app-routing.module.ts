import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationResolve } from '@core/resolves';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        resolve: { loggedIn: AuthenticationResolve },
        children: [
            {
                path: '',
                loadChildren: () => import('./platform/main/main.module').then((m) => m.MainModule),
            },
            {
                path: 'account',
                loadChildren: () => import('./platform/account/account.module').then((m) => m.AccountModule),
            },
            {
                path: 'games',
                loadChildren: () => import('./platform/games/games.module').then((m) => m.GamesModule),
            },
            {
                path: 'stats',
                loadChildren: () => import('./platform/stats/stats.module').then((m) => m.StatsModule),
            },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
