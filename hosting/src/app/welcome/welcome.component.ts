import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public joinForm: FormGroup;

  constructor(
    private forms: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.joinForm = this.forms.group({
      alias: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      location: [undefined, [Validators.required]]
    });

  }

  public enterQuiz(): void {
    console.log(this.joinForm.getRawValue());
  }

}
