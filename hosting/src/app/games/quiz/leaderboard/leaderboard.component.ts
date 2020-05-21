import { Component, Input, OnInit } from '@angular/core';

import { User } from '@core/models';

import { Quiz, Round, RoundResult } from '../quiz.model';
import { ResultService } from '../result.service';

@Component({
    selector: 'game-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: [ './leaderboard.component.scss' ],
    providers: [ ResultService ],
})
export class LeaderboardComponent implements OnInit {

    public results: Array<RoundResult<User>> = [];

    @Input()
    public quiz: Quiz;

    @Input()
    public round: Round;

    constructor(
        private resultService: ResultService,
    ) { }

    public ngOnInit(): void {
        this.resultService
            .findAll(this.quiz.uid, this.round.uid)
            .subscribe(
                (results) => this.results = results,
            );
    }

}
