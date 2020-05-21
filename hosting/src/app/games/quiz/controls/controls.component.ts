import { Component, Input } from '@angular/core';

import { QuizService } from '../quiz.service';
import { Quiz, Round } from '../quiz.model';

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

    get next(): 'START' | 'QUESTION' | 'ROUND' | 'FINISH' {
        if (!this.currentRound && (<Array<string>> this.quiz.roundList).length > 0) {
            return 'START';
        }

        const questionIds = (<Array<string>> this.currentRound.questionList);
        const questionIdx = questionIds.indexOf(this.quiz.currentQuestion) + 1;

        if (questionIdx === 0 && questionIds.length > 0 || questionIdx < questionIds.length) {
            return 'QUESTION';
        }

        if (questionIdx === 0 || questionIdx === questionIds.length) {
            const roundIds = (<Array<string>> this.quiz.roundList);
            const roundIdx = roundIds.indexOf(this.currentRound.uid) + 1;

            if (roundIdx === 0 && roundIds.length > 0 || roundIdx < roundIds.length) {
                return 'ROUND';
            }
        }

        return 'FINISH';
    }

    public startQuiz(): void {
        this.quizService.nextQuestion(this.quiz.uid, this.quiz.roundList[0]).subscribe();
    }

    public nextQuestion(): void {
        const questionIds = (<Array<string>> this.currentRound.questionList);
        const questionIdx = questionIds.indexOf(this.quiz.currentQuestion) + 1;
        this.quizService.nextQuestion(this.quiz.uid, this.currentRound.uid, questionIds[questionIdx]).subscribe();
    }

    public nextRound(): void {
        this.waiting = true;
        this.quizService
            .endRound(this.quiz.uid, this.currentRound.uid)
            .subscribe(() => this.waiting = false);
    }

    public endQuiz(): void {
        console.log('END THE QUIZ');
    }

}
