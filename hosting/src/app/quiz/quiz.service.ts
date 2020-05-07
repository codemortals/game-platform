import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Question, Quiz, Round } from './quiz';
import { Message } from '@core/models';

@Injectable()
export class QuizService {

    constructor(
        private angularFirestore: AngularFirestore,
    ) { }

    public createRound(gameId: string, title: string, description: string, order: number): Observable<string> {
        const round: Round<string> = {
            uid: this.angularFirestore.createId(),
            title, description, order,
        };

        const quizRef = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        const roundRef = quizRef
            .collection<Round<string>>('rounds')
            .doc<Round<string>>(round.uid);

        // TODO: This is to ensure that the parent collection exists.... consider potential performance / reduction in queries by not always setting the quiz
        return from(quizRef.set({ uid: gameId }))
            .pipe(
                mergeMap(() => roundRef.set(round)),
                map(() => round.uid),
            );
    }

    public createQuestion(gameId: string, roundId: string, title: string, type: string, choices: Array<{ option: string, answer: boolean }>): Observable<string> {
        const question: Question = {
            uid: this.angularFirestore.createId(),
            title, type, choices,
            created: firestore.FieldValue.serverTimestamp(),
        };

        const batch = this.angularFirestore.firestore.batch();

        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        const roundDoc = quizDoc
            .collection<Round<string>>('rounds')
            .doc<Round<string>>(roundId);

        const questionDoc = roundDoc
            .collection<Question>('questions')
            .doc<Question>(question.uid);

        batch.set(questionDoc.ref, question);
        batch.update(roundDoc.ref, { totalQuestions: firestore.FieldValue.increment(1) });

        return from(batch.commit())
            .pipe(
                map(() => question.uid),
            );
    }

    public findRounds(gameId: string): Observable<Array<Round<string>>> {
        const quizRef = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        return quizRef
            .collection<Round<string>>('rounds', (ref: firestore.Query) => ref.orderBy('order'))
            .stateChanges([ 'added' ])
            .pipe(
                map((rounds) => rounds
                    .map((round: DocumentChangeAction<Round<string>>) => round.payload.doc.data()),
                ),
            );
    }

    public findQuestions(gameId: string, roundId: string): Observable<Array<Question>> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        const roundDoc = quizDoc
            .collection<Round<string>>('rounds')
            .doc<Round<string>>(roundId);

        return roundDoc
            .collection<Question>('questions', (ref: firestore.Query) => ref.orderBy('created'))
            .stateChanges([ 'added' ])
            .pipe(
                map((questions) => questions
                    .map((question: DocumentChangeAction<Question>) => question.payload.doc.data({ serverTimestamps: 'estimate' })),
                ),
            );
    }

}
