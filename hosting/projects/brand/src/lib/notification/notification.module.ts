import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandNotificationComponent } from './notification.component';
import { BrandNotificationHeaderDirective } from './notification-header.directive';
import { BrandNotificationMessageDirective } from './notification-message.directive';

@NgModule({
    declarations: [
        BrandNotificationComponent,
        BrandNotificationHeaderDirective,
        BrandNotificationMessageDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        BrandNotificationComponent,
        BrandNotificationHeaderDirective,
        BrandNotificationMessageDirective,
    ],
})
export class BrandNotificationModule {
}
