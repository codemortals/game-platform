import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { Choice, Question, QuestionSummary, Quiz, Round } from '../quiz.model';

import { Subject } from 'rxjs';

import { AnswerService } from '../answer.service';
import { debounceTime, filter, take, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'game-question',
    templateUrl: './question.component.html',
    styleUrls: [ './question.component.scss' ],
    providers: [ AnswerService ],
})
export class QuestionComponent implements OnChanges, OnDestroy, OnInit {

    public answer: Subject<{ quizId: string, roundId: string, questionId: string, response: Array<string> }> = new Subject();
    public currentResponse: Array<string> = [];

    public isDestroyed = new Subject();

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
        this.answer
            .pipe(
                takeUntil(this.isDestroyed),
                debounceTime(1000),
            )
            .subscribe(
                (answer) => this.answerService.create(answer.quizId, answer.roundId, answer.questionId, answer.response),
            );
    }

    public ngOnChanges(): void {
        if (!this.question) {
            return;
        }

        this.answerService
            .findOne(this.quiz.uid, this.round.uid, this.question.uid)
            .pipe(
                // TODO: Consider not using take but takeUntil,
                //  however there can be an interesting user experience,
                //  but this would help sync across multiple inputs
                take(1),
                tap(() => this.currentResponse = []),
                filter((answer) => !!answer),
            )
            .subscribe(
                (answer) => this.currentResponse = answer.response,
            );
    }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
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

        this.answer.next({ quizId: this.quiz.uid, roundId: this.round.uid, questionId: this.question.uid, response: this.currentResponse });
    }

}
