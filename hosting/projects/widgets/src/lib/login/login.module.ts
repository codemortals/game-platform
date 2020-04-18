import { NgModule } from '@angular/core';
import { WidgetLoginComponent } from './login.component';

@NgModule({
    declarations: [
        WidgetLoginComponent,
    ],
    exports: [
        WidgetLoginComponent,
    ]
})
export class WidgetLoginModule {
}
