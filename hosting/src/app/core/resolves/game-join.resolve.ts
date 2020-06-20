import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { PlayerService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class GameJoinResolve implements Resolve<void> {

    constructor(
        private playerService: PlayerService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
        return this.playerService.create(route.params.gameId).pipe(take(1));
    }

}
