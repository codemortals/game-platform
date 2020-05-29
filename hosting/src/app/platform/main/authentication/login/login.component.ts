import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@core/services';

@Component({
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
})
export class LoginComponent implements OnInit {

    public sending = false;
    public loginForm: FormGroup;
    public error: string;

    constructor(
        private form: FormBuilder,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.loginForm = this.form.group({
            email: [ undefined, [ Validators.required, Validators.email ] ],
            password: [ undefined, [ Validators.required, Validators.minLength(2) ] ],
        });
    }

    public login(): void {
        this.sending = true;

        const credentials = this.loginForm.getRawValue();

        this.authenticationService
            .signIn(credentials.email, credentials.password)
            .subscribe(
                () => {},
                (err) => {
                    this.error = err.message;
                    this.sending = false;
                }
            );
    }

}
