import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/services';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: [ './welcome.component.scss' ],
})
export class WelcomeComponent implements OnInit {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService.checkLoggedIn();
    }

    public facebookLogin(): void {
        this.authenticationService.login('facebook');
    }

}
