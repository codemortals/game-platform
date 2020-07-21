import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { WidgetsModule } from '@widgets/widgets.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgottenComponent } from './authentication/forgotten/forgotten.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { TermsComponent } from './legal/terms/terms.component';

import { MainRouting } from './main.routing';

@NgModule({
    declarations: [
        WelcomeComponent,
        AuthenticationComponent,
        LoginComponent,
        RegisterComponent,
        ForgottenComponent,
        PrivacyComponent,
        TermsComponent,
    ],
    imports: [
        CoreModule,
        WidgetsModule,
        MainRouting,
    ],
})
export class MainModule {
}
