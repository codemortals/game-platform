import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Question, Quiz, Round } from './quiz';

@Injectable()
export class QuestionService {

    constructor(
        private angularFirestore: AngularFirestore,
    ) { }

    public create(quizId: string, roundId: string, title: string, type: string, choices: Array<{ option: string, answer: boolean }>): Observable<string> {
        const question: Question = {
            uid: this.angularFirestore.createId(),
            title, type, choices,
            created: firestore.FieldValue.serverTimestamp(),
        };

        const batch = this.angularFirestore.firestore.batch();

        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

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

    public findOne(quizId: string, roundId: string, questionId: string): Observable<Question> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        const roundDoc = quizDoc
            .collection<Round>('rounds')
            .doc<Round>(roundId);

        return roundDoc
            .collection<Question>('questions')
            .doc<Question>(questionId)
            .valueChanges();

    }

    public findAll(quizId: string, roundId: string): Observable<Array<Question>> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

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
