import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';

import { Quiz } from './quiz';

@Injectable()
export class QuizService {

    constructor(
        private angularFirestore: AngularFirestore,
    ) { }

    public nextQuestion(quizId: string, currentRound: string, currentQuestion: string): Observable<void> {
        const quizRef = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        return from(quizRef.update({ currentRound, currentQuestion }));
    }

    public findOne(quizId: string): Observable<Quiz> {
        const quizRef = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        return quizRef.valueChanges();
    }

}
