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

    @Input()
    public quiz: Quiz;

    @Input()
    public currentRound: Round;

    constructor(
        private quizService: QuizService,
    ) { }

    public nextQuestion(): void {
        if (!this.currentRound) {
            this.goto(this.quiz.roundList[0]);
            return;
        }

        const questionIds = (<Array<string>> this.currentRound.questionList);
        const questionIdx = questionIds.indexOf(this.quiz.currentQuestion) + 1;

        // First question in the round, but make sure there are questions in the round....
        if (questionIdx === 0 && questionIds.length > 0) {
            this.goto(this.currentRound.uid, this.currentRound.questionList[0]);
            return;
        }

        // Go to next round, if no questions in the round or the last question
        if (questionIdx === 0 || questionIdx === questionIds.length) {
            const roundIds = (<Array<string>> this.quiz.roundList);
            const roundIdx = roundIds.indexOf(this.currentRound.uid) + 1;

            // Can this happen?
            if (roundIdx === 0) {
                console.log('ERROR THIS SHOULD NOT BE POSSIBLE');
                return;
            }

            // Last round should end the game... need an end screen
            if (roundIdx === roundIds.length) {
                console.log('END OF GAME');
                return;
            }

            // Go to the next round
            this.goto(roundIds[roundIdx]);
            return;
        }

        // Default is to show the next question in the round
        this.goto(this.currentRound.uid, questionIds[questionIdx]);
    }

    private goto(roundId, questionId = null) {
        this.quizService.nextQuestion(this.quiz.uid, roundId, questionId).subscribe();
    }

}
