import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

import { Game, Player, User } from '@core/models';
import { PlayerService } from '@core/services';

@Component({
    templateUrl: './results.component.html',
    styleUrls: [ './results.component.scss' ],
})
export class GameResultsComponent implements OnInit {

    public game: Game;
    public players: Array<Player<User>> = [];

    constructor(
        private route: ActivatedRoute,
        private playerService: PlayerService,
    ) { }

    public ngOnInit(): void {
        this.game = this.route.snapshot.data.gameData;

        this.playerService
            .findAll(this.route.snapshot.params.gameId, 'score')
            .pipe(take(1))
            .subscribe((players) => this.players = [ ...this.players, ...players ]);
    }

}
