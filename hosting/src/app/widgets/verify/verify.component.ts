import { Component } from '@angular/core';
import { AuthenticationService } from '@core/services';

@Component({
    selector: 'game-verify',
    templateUrl: './verify.component.html',
    styleUrls: [ './verify.component.scss' ],
})
export class WidgetVerifyComponent {

    public sent = false;
    public sending = false;

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public resendVerification(): void {
        if (this.sending) {
            return;
        }
        this.sending = true;

        this.authenticationService.sendVerification()
            .subscribe(
                () => this.sent = true,
                () => this.sending = false,
            );
    }

}
