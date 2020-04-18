import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './core/services';
import { UserAccount } from './core/models';

@Component({
    templateUrl: './game.component.html',
    styleUrls: [ './game.component.scss' ],
})
export class GameComponent implements OnInit {

    public user: UserAccount;

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService.account.subscribe((account) => this.user = account);
    }

    public login(provider: 'facebook'): void {
        this.authenticationService.login(provider);
    }

    public logout(): void {
        this.authenticationService.logout().subscribe();
    }

}
