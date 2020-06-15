import { Component, Input } from '@angular/core';

import { QuizService } from '../quiz.service';
import { QuestionSummary, Quiz, Round, RoundSummary } from '../quiz.model';

@Component({
    selector: 'game-controls',
    templateUrl: './controls.component.html',
    styleUrls: [ './controls.component.scss' ],
    providers: [
        QuizService,
    ],
})
export class ControlsComponent {

    public waiting = false;

    @Input()
    public quiz: Quiz;

    @Input()
    public currentRound: Round;

    constructor(
        private quizService: QuizService,
    ) { }

    get next(): 'START' | 'QUESTION' | 'CALCULATE' | 'ROUND' | 'FINISH' {
        if (!this.quiz || !this.currentRound && (<Array<RoundSummary>> this.quiz.roundList).length > 0) {
            return 'START';
        }

        const questionIds = (<Array<QuestionSummary>> this.currentRound.questionList);
        const questionIdx = questionIds.findIndex((question) => question.uid === this.quiz.currentQuestion) + 1;

        if (questionIdx === 0 && questionIds.length > 0 || questionIdx < questionIds.length) {
            return 'QUESTION';
        }

        const roundIds = <Array<RoundSummary>> this.quiz.roundList;
        const roundIdx = roundIds.findIndex((round) => round.uid === this.currentRound.uid) + 1;

        if (
            (questionIdx === 0 || questionIdx === questionIds.length) &&
            (roundIdx === 0 && roundIds.length > 0 || roundIdx < roundIds.length)
        ) {
            return roundIds[ roundIdx - 1 ].status === 'COMPLETED' ? 'ROUND' : 'CALCULATE';
        }

        return roundIds[ roundIdx - 1 ].status === 'COMPLETED' ? 'FINISH' : 'CALCULATE';
    }

    public startQuiz(): void {
        this.waiting = true;
        this.quizService
            .changeQuestion(this.quiz.uid, this.quiz.roundList[ 0 ].uid)
            .subscribe(() => this.waiting = false);
    }

    public nextQuestion(): void {
        this.waiting = true;
        const questionIds = (<Array<QuestionSummary>> this.currentRound.questionList);
        const questionIdx = questionIds.findIndex((question) => question.uid === this.quiz.currentQuestion) + 1;
        this.quizService
            .changeQuestion(this.quiz.uid, this.currentRound.uid, questionIds[ questionIdx ].uid)
            .subscribe(() => this.waiting = false);
    }

    public endRound(): void {
        this.waiting = true;
        this.quizService
            .endRound(this.quiz.uid, this.currentRound.uid)
            .subscribe(() => this.waiting = false);
    }

    public nextRound(): void {
        this.waiting = true;
        const roundIds = (<Array<RoundSummary>> this.quiz.roundList);
        const roundIdx = roundIds.findIndex((round) => round.uid === this.currentRound.uid) + 1;
        this.quizService
            .changeQuestion(this.quiz.uid, roundIds[ roundIdx ].uid)
            .subscribe(() => this.waiting = false);
    }

    public endQuiz(): void {
        console.log('END THE QUIZ');
    }

}
