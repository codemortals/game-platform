import { Component, OnInit } from '@angular/core';

import { User } from '@core/models';
import { AuthenticationService } from '@core/services';

@Component({
    selector: 'game-account',
    templateUrl: './account.component.html',
    styleUrls: [ './account.component.scss' ],
})
export class WidgetAccountComponent implements OnInit {

    public user: User;

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService.user.subscribe((user) => this.user = user);
    }

    public performLogout() {
        this.authenticationService
            .logout()
            .subscribe();
    }

}
