import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@core/services';
import { catchError, tap } from 'rxjs/operators';

@Component({
    templateUrl: './forgotten.component.html',
    styleUrls: [ './forgotten.component.scss' ],
})
export class ForgottenComponent implements OnInit {

    public sent = false;
    public sending = false;
    public error: string;
    public forgottenForm: FormGroup;

    constructor(
        private form: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.forgottenForm = this.form.group({
            email: [ undefined, [ Validators.required, Validators.email ] ],
        });
    }

    public recoverAccount(): void {
        this.sending = true;
        this.error = undefined;

        const credentials = this.forgottenForm.getRawValue();

        this.authenticationService
            .sendReset(credentials.email)
            .pipe(
                tap(() => this.sent = true),
                tap(() => this.forgottenForm.reset()),
                catchError((err) => this.error = err.message),
                tap(() => this.sending = false)
            )
            .subscribe();
    }

}
