import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GameService } from '../../core/services';
import { Game } from '../../core/models';

@Component({
    templateUrl: './create.component.html',
    styleUrls: [ './create.component.scss' ],
})
export class GameCreateComponent implements OnInit {

    public gameForm: FormGroup;

    constructor(
        private form: FormBuilder,
        private router: Router,
        private gameService: GameService,
    ) { }

    public ngOnInit(): void {
        this.gameForm = this.form.group({
            name: [ undefined, [Validators.required] ],
        });
    }

    public cancel(): void {
        this.router.navigate(['/'], { replaceUrl: true });
    }

    public createGame(): void {
        const formData = this.gameForm.getRawValue();
        const game: Game = {
            name: formData.name,
        };

        this.gameService
            .create(game)
            .subscribe(
                () => this.router.navigate([ '/' ])
            );
    }

}
