import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class VerifyGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authenticationService
            .checkLoggedIn()
            .pipe(map(() => true));
    }

}
