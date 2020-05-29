import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AccountActionResolve implements Resolve<void> {

    constructor(
        private router: Router,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
        const code = route.queryParams.oobCode;

        if (!code) {
            this.router.navigate([ '/' ], { replaceUrl: true });
        }

        switch (route.queryParams.mode) {
            case 'verifyEmail':
                this.router.navigate([ '/', 'account', 'activate' ], { queryParams: { code }, replaceUrl: true });
                break;
            case 'resetPassword':
                this.router.navigate([ '/', 'account', 'recover' ], { queryParams: { code }, replaceUrl: true });
                break;
            default:
                this.router.navigate([ '/' ], { replaceUrl: true });
        }
    }

}
