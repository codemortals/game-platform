import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameListResolve } from '@core/resolves';
import { AnonymousGuard } from '@core/guards';

import { AuthenticationComponent } from './authentication/authentication.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgottenComponent } from './authentication/forgotten/forgotten.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        resolve: {
            gameData: GameListResolve,
        },
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'forgotten',
                component: ForgottenComponent,
            },
        ],
        canActivate: [
            AnonymousGuard,
        ],
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
