import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { AuthenticationService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationResolve implements Resolve<boolean> {

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService
            .checkLoggedIn()
            .pipe(
                take(1),
                catchError(() => of(false)),
                map(() => true),
            );
    }

}
