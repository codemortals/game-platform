import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistrationService } from '../core/services';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public joinForm: FormGroup;

  constructor(
    private router: Router,
    private forms: FormBuilder,
    private registrationService: RegistrationService,
  ) { }

  ngOnInit(): void {

    this.joinForm = this.forms.group({
      alias: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      location: [undefined, [Validators.required]]
    });

  }

  public enterQuiz(): void {
    const entrant = this.joinForm.getRawValue();

    this.registrationService
      .create(entrant)
      .subscribe(
        () => this.router.navigate(['/', 'quiz'])
      );
  }

}
