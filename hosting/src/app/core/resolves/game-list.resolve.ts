import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Game } from '../models';
import { GameService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class GameListResolve implements Resolve<Array<Game>> {

    constructor(
        private gameService: GameService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Game>> {
        return this.gameService
            .findAll()
            .pipe(take(1));
    }

}
