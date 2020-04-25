import { Component, OnInit } from '@angular/core';

import { User } from '@core/models';
import { AuthenticationService } from '@core/services';

@Component({
    templateUrl: './layout.component.html',
    styleUrls: [ './layout.component.scss' ],
})
export class LayoutComponent implements OnInit {

    public user: User;

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService.user.subscribe((user) => this.user = user);
    }

    public login(provider: 'facebook'): void {
        this.authenticationService.login(provider);
    }

    public logout(): void {
        this.authenticationService.logout().subscribe();
    }

}
