import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { from, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { GameService } from '@core/services';

@Injectable({
    providedIn: 'root',
})
export class GameStatusGuard implements CanActivate {

    constructor(
        private router: Router,
        private gameService: GameService,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const checkStates = route.data.states;
        return this.gameService
            .findOne(route.params.gameId)
            .pipe(
                take(1),
                mergeMap((game) => {
                    if (!checkStates.includes(game.status)) {
                        return from(this.router.navigate([ 'games', game.uid, route.data.next ]));
                    }
                    return of(true);
                }),
            );
    }

}
