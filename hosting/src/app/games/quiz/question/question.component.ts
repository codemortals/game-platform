import { Component, Input, OnChanges } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { Choice, Question, Quiz, Round } from '../quiz.model';
import { AnswerService } from '../answer.service';

@Component({
    selector: 'game-question',
    templateUrl: './question.component.html',
    styleUrls: [ './question.component.scss' ],
    providers: [ AnswerService ],
})
export class QuestionComponent implements OnChanges {

    public saved = false;
    public response: Array<string> = [];

    @Input()
    public quiz: Quiz;

    @Input()
    public round: Round;

    @Input()
    public question: Question;

    constructor(
        private answerService: AnswerService,
    ) { }

    public ngOnChanges(): void {
        if (!this.question) {
            return;
        }

        this.answerService
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
            this.response.push(choice.uid);
        }
    }

    public saveAnswer(): void {
        this.answerService
            .create(this.quiz.uid, this.round.uid, this.question.uid, this.response)
            .pipe(
                map(() => this.saved = true),
            )
            .subscribe();
    }

    public getRoundProgress(): number {
        return (<Array<string>> this.quiz.roundList).findIndex((roundUid) => this.round.uid === roundUid) + 1;
    }

    public getQuestionProgress(): number {
        return (<Array<string>> this.round.questionList).findIndex((questionUid) => this.question.uid === questionUid) + 1;
    }
}
