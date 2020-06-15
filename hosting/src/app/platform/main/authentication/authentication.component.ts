import { Component } from '@angular/core';

import { AuthenticationService } from '@core/services';

@Component({
    templateUrl: './authentication.component.html',
    styleUrls: [ './authentication.component.scss' ],
})
export class AuthenticationComponent {

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public login(provider: 'google' | 'twitter' | 'facebook' | 'github') {
        this.authenticationService.login(provider);
    }

}
