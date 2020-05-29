import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountActionResolve } from '@core/resolves';

import { ActivateComponent } from './activate/activate.component';
import { RecoverComponent } from './recover/recover.component';

const routes: Routes = [
    {
        path: 'action',
        resolve: [
            AccountActionResolve,
        ]
    },
    {
        path: 'activate',
        component: ActivateComponent,
    },
    {
        path: 'recover',
        component: RecoverComponent,
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
export class AccountRouting {
}
