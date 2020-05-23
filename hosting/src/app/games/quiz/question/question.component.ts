import { Component, Input, OnChanges } from '@angular/core';

import { Choice, Question, QuestionSummary, Quiz, Round } from '../quiz.model';

import { Subscription } from 'rxjs';

import { AnswerService } from '../answer.service';
import { delay, map, tap } from 'rxjs/operators';

@Component({
    selector: 'game-question',
    templateUrl: './question.component.html',
    styleUrls: [ './question.component.scss' ],
    providers: [ AnswerService ],
})
export class QuestionComponent implements OnChanges {

    public saved = false;
    public saving = false;
    public response: Array<string> = [];

    private subscription: Subscription;

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
        return `${current} / ${list.length}`;
    }

    public ngOnChanges(): void {
        if (!this.question) {
            return;
        }

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.answerService
            .findOne(this.quiz.uid, this.round.uid, this.question.uid)
            .pipe(
                tap((answer) => this.saved = !!answer)
            )
            .subscribe(
                (answer) => this.response = answer ? answer.response : []
            );
    }

    public isSelected(choice: Choice): boolean {
        return this.response.indexOf(choice.uid) >= 0;
    }

    public toggleChoice(choice: Choice): void {
        const idx = this.response.indexOf(choice.uid);

        if (idx >= 0) {
            this.response.splice(idx, 1);
        } else {
            this.response = [ ...this.response, choice.uid ];
        }
    }

    public saveAnswer(): void {
        this.answerService.create(this.quiz.uid, this.round.uid, this.question.uid, this.response)
            .pipe(
                map(() => this.saving = true),
                delay(800),
                map(() => this.saved = true),
                map(() => this.saving = false),
            )
            .subscribe();
    }

}
