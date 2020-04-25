import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Game } from '@core/models';
import { AuthenticationService, GameService } from '@core/services';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: [ './welcome.component.scss' ],
})
export class WelcomeComponent implements OnDestroy, OnInit {

    public gameList: Array<Game> = [];

    private isDestroyed = new Subject();

    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private gameService: GameService,
    ) { }

    public ngOnInit(): void {
        this.gameList = this.route.snapshot.data.gameData;

        this.gameService
            .findAll()
            .pipe(
                takeUntil(this.isDestroyed),
            )
            .subscribe((games) => this.gameList = games);
    }

    public ngOnDestroy(): void {
        this.isDestroyed.complete();
        this.isDestroyed.next();
    }

    public login() {
        this.authenticationService.login('facebook');
    }

}
