import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { GameService, PlayerService } from '../services';
import { Game } from '@core/models';

@Injectable({
    providedIn: 'root',
})
export class GameJoinResolve implements Resolve<Game> {

    constructor(
        private router: Router,
        private gameService: GameService,
        private playerService: PlayerService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game> {
        const gameData = this.gameService.findOne(route.params.gameId).pipe(take(1));
        const playerJoin = this.playerService.create(route.params.gameId).pipe(take(1));

        return forkJoin({ gameData, playerJoin })
            .pipe(
                map((result) => {
                    const game = result.gameData;

                    if (game.status === 'IN_PROGRESS') {
                        this.router.navigate([ '/', 'games', route.params.gameId, 'play' ]);
                    }

                    return game;
                }),
            );
    }

}
