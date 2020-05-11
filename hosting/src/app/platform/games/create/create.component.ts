import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Game } from '@core/models';
import { GameService } from '@core/services';

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
            name: [ undefined, [ Validators.required ] ],
        });
    }

    public cancel(): void {
        this.router.navigate([ '/' ], { replaceUrl: true });
    }

    public createGame(): void {
        const gameName = this.gameForm.get('name').value;

        this.gameService
            .create(gameName)
            .subscribe(
                (game: Game) => this.router.navigate([ '/', 'games', game.uid, 'lobby' ]),
            );
    }

}
