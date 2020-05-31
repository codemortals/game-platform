import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {

    constructor(
        private router: Router,
        private angularFireAuth: AngularFireAuth,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.angularFireAuth.authState
            .pipe(
                take(1),
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
