import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Choice, Question, QuestionSummary, Quiz, Round } from '../quiz.model';

import { Subject } from 'rxjs';

import { AnswerService } from '../answer.service';
import { debounceTime, filter, take, tap } from 'rxjs/operators';

@Component({
    selector: 'game-question',
    templateUrl: './question.component.html',
    styleUrls: [ './question.component.scss' ],
    providers: [ AnswerService ],
})
export class QuestionComponent implements OnChanges, OnInit {

    public response: Subject<Array<string>> = new Subject();
    public currentResponse: Array<string> = [];

    @Input()
    public quiz: Quiz;

    @Input()
    public round: Round;

    @Input()
    public question: Question;

    constructor(
        private answerService: AnswerService,
    ) { }

    get progress(): string {
        const list = (<Array<QuestionSummary>> this.round.questionList);
        const current = list.findIndex((question) => question.uid === this.question.uid) + 1;
        return `${ current } / ${ list.length }`;
    }

    public ngOnInit(): void {
        this.response
            .pipe(
                debounceTime(200),
                tap((response) => this.currentResponse = response),
            )
            .subscribe(
                (response) => this.answerService.create(this.quiz.uid, this.round.uid, this.question.uid, response)
            );
    }

    public ngOnChanges(): void {
        if (!this.question) {
            return;
        }

        this.answerService
            .findOne(this.quiz.uid, this.round.uid, this.question.uid)
            .pipe(
                take(1),
                tap(() => this.currentResponse = []),
                filter((answer) => !!answer),
            )
            .subscribe(
                (answer) => this.currentResponse = answer.response,
            );
    }

    public isSelected(choice: Choice): boolean {
        return this.currentResponse.indexOf(choice.uid) >= 0;
    }

    public toggleChoice(choice: Choice): void {
        const idx = this.currentResponse.indexOf(choice.uid);

        if (idx >= 0) {
            this.currentResponse.splice(idx, 1);
        } else {
            this.currentResponse = [ ...this.currentResponse, choice.uid ];
        }

        this.response.next(this.currentResponse);
    }

}
