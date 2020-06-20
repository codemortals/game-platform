import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { from, Observable } from 'rxjs';

import { Quiz } from './quiz.model';

@Injectable()
export class QuizService {

    constructor(
        private angularFirestore: AngularFirestore,
        private fireFunctions: AngularFireFunctions,
    ) { }

    public endRound(quizId: string, roundId: string): Observable<void> {
        const endRound = this.fireFunctions.httpsCallable<any, void>('QuizRoundEnd');
        return endRound({ quizId, roundId });
    }

    public endQuiz(quizId: string): Observable<void> {
        const endQuiz = this.fireFunctions.httpsCallable<any, void>('QuizEnd');
        return endQuiz({ quizId });
    }

    public changeQuestion(quizId: string, currentRound: string, currentQuestion: string = null): Observable<void> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        return from(quizDoc.update({ currentRound, currentQuestion }));
    }

    public findOne(quizId: string): Observable<Quiz> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        return quizDoc.valueChanges();
    }

}
