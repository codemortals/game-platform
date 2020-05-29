import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { AuthenticationService } from '@core/services';

@Injectable({
    providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService
            .checkLoggedIn(false)
            .pipe(
                take(1),
                catchError(() => of(false)),
                map((user) => !user),
                map((result) => {
                    if (!result) {
                        this.router.navigate([ '/' ]);
                    }
                    return result;
                }),
            );
    }

}
