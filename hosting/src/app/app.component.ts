import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './core/services';
import { UserAccount } from './core/models';

@Component({
    selector: 'mortal-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    public user: UserAccount;

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService.account.subscribe((account) => this.user = account);
    }

    public logout(): void {
        this.authenticationService.logout().subscribe();
    }

}
