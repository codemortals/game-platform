import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '@core/models';

import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz';

@Component({
    templateUrl: './play.component.html',
    styleUrls: [ './play.component.scss' ],
    providers: [ QuizService ],
})
export class PlayComponent implements OnInit {

    public game: Game;
    public quiz: Quiz;

    constructor(
        private route: ActivatedRoute,
        private quizService: QuizService,
    ) { }


    public ngOnInit(): void {
        this.game = this.route.snapshot.data.gameData;

        this.quizService
            .findOne(this.route.snapshot.params.gameId)
            .subscribe((quiz) => this.quiz = quiz);
    }

}
