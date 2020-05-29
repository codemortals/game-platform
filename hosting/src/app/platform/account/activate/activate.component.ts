import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { timer } from 'rxjs';
import { delay, mergeMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '@core/services';

@Component({
    templateUrl: './activate.component.html',
    styleUrls: [ './activate.component.scss' ],
})
export class ActivateComponent implements OnInit {

    public state: 'PENDING' | 'ALREADY_ACTIVE' | 'FAILED' | 'SUCCESS' = 'PENDING';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        const user = this.authenticationService.user.getValue();

        if (user && user.verified) {
            this.state = 'ALREADY_ACTIVE';
            timer(10000).subscribe(() => this.router.navigate([ '/' ], { replaceUrl: true }));
            return;
        }

        const code = this.route.snapshot.queryParams.code;

        if (!code) {
            this.state = 'FAILED';
            return;
        }

        timer(2000)
            .pipe(
                mergeMap(() => this.authenticationService.verify(code)),
                tap(() => this.state = 'SUCCESS'),
                delay(20000),
            )
            .subscribe(
                () => this.router.navigate([ '/' ], { replaceUrl: true }),
                () => this.state = 'FAILED',
            );
    }

    public resendVerification(): void {
        this.authenticationService
            .sendVerification()
            .subscribe();
    }

}
