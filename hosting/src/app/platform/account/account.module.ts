import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';

import { ActivateComponent } from './activate/activate.component';
import { RecoverComponent } from './recover/recover.component';

import { AccountRouting } from './account.routing';

@NgModule({
    declarations: [
        ActivateComponent,
        RecoverComponent,
    ],
    imports: [
        CoreModule,
        AccountRouting,
    ],
})
export class AccountModule {
}
