import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { from, Observable } from 'rxjs';

import { AuthenticationService } from '@core/services';

import { Answer, Question, Quiz, Round } from './quiz.model';

@Injectable()
export class AnswerService {

    constructor(
        private angularFirestore: AngularFirestore,
        private authenticationService: AuthenticationService,
    ) { }

    public create(quizId: string, roundId: string, questionId: string, response: Array<string>): Observable<void> {
        const answer: Answer = {
            user: this.authenticationService.user.getValue().uid,
            response,
            created: firestore.FieldValue.serverTimestamp()
        };

        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        const roundDoc = quizDoc
            .collection<Round>('rounds')
            .doc<Round>(roundId);

        const questionDoc = roundDoc
            .collection<Question>('questions')
            .doc<Question>(questionId);

        const answerDoc = questionDoc
            .collection<Answer>('answers')
            .doc<Answer>(answer.user);

        return from(answerDoc.set(answer));
    }

    public findOne(quizId: string, roundId: string, questionId: string): Observable<Answer> {
        const userId = this.authenticationService.user.getValue().uid;

        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        const roundDoc = quizDoc
            .collection<Round>('rounds')
            .doc<Round>(roundId);

        const questionDoc = roundDoc
            .collection<Question>('questions')
            .doc<Question>(questionId);

        const answerDoc = questionDoc
            .collection<Answer>('answers')
            .doc<Answer>(userId);

        return answerDoc.valueChanges();
    }

}
