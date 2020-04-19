import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { AuthenticationService, GameService } from '../core/services';
import { Game } from '../core/models';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: [ './welcome.component.scss' ],
})
export class WelcomeComponent implements OnDestroy, OnInit {

    public gameList: Array<Game> = [];

    private isDestroyed = new Subject();

    constructor(
        private authenticationService: AuthenticationService,
        private gameService: GameService,
    ) { }

    public ngOnInit(): void {
        this.gameService.list().subscribe((games) => this.gameList = games);
    }

    public ngOnDestroy(): void {
        this.isDestroyed.complete();
        this.isDestroyed.next();
    }

    public login() {
        this.authenticationService.login('facebook');
    }

}
