import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Game } from '../models';
import { GameService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class GameRetrieveResolve implements Resolve<Game> {

    constructor(
        private gameService: GameService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game> {
        return this.gameService
            .findOne(route.params.gameId)
            .pipe(take(1));
    }

}
