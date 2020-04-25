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
                loadChildren: () => import('./platform/platform.module').then((m) => m.PlatformModule),
            },
            {
                path: 'game',
                loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
            },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
