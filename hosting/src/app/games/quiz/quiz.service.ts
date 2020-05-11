import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question, Quiz, Round } from './quiz';

@Injectable()
export class QuizService {

    constructor(
        private angularFirestore: AngularFirestore,
    ) { }

    public createRound(gameId: string, title: string, description: string): Observable<string> {
        const batch = this.angularFirestore.firestore.batch();

        const round: Round = {
            uid: this.angularFirestore.createId(),
            title, description,
            created: firestore.FieldValue.serverTimestamp(),
        };

        const quizRef = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        const roundRef = quizRef
            .collection<Round>('rounds')
            .doc<Round>(round.uid);

        batch.set(quizRef.ref, { uid: gameId, roundList: firestore.FieldValue.arrayUnion(round.uid) }, { merge: true });
        batch.set(roundRef.ref, round);

        return from(batch.commit())
            .pipe(
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
            .collection<Round>('rounds')
            .doc<Round>(roundId);

        const questionDoc = roundDoc
            .collection<Question>('questions')
            .doc<Question>(question.uid);

        batch.update(roundDoc.ref, { questionList: firestore.FieldValue.arrayUnion(question.uid) });
        batch.set(questionDoc.ref, question);

        return from(batch.commit())
            .pipe(
                map(() => question.uid),
            );
    }

    public findOne(gameId: string): Observable<Quiz> {
        const quizRef = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        return quizRef.valueChanges();
    }

    public findRounds(gameId: string): Observable<Array<Round>> {
        const quizRef = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        return quizRef
            .collection<Round>('rounds', (ref: firestore.Query) => ref.orderBy('created'))
            .stateChanges([ 'added' ])
            .pipe(
                map((rounds) => rounds
                    .map((round: DocumentChangeAction<Round>) => round.payload.doc.data({ serverTimestamps: 'estimate' })),
                ),
            );
    }

    public findQuestions(gameId: string, roundId: string): Observable<Array<Question>> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(gameId);

        const roundDoc = quizDoc
            .collection<Round>('rounds')
            .doc<Round>(roundId);

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
