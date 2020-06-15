import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandNotificationComponent } from './notification.component';
import { BrandNotificationHeaderDirective } from './notification-header.directive';
import { BrandNotificationMessageDirective } from './notification-message.directive';
import { BrandNotificationCountdownDirective } from './notification-countdown.directive';

@NgModule({
    declarations: [
        BrandNotificationComponent,
        BrandNotificationHeaderDirective,
        BrandNotificationMessageDirective,
        BrandNotificationCountdownDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BrandNotificationComponent,
        BrandNotificationHeaderDirective,
        BrandNotificationMessageDirective,
        BrandNotificationCountdownDirective,
    ],
})
export class BrandNotificationModule {
}
