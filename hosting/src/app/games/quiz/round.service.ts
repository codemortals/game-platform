import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quiz, Round } from './quiz.model';

@Injectable()
export class RoundService {

    constructor(
        private angularFirestore: AngularFirestore,
    ) { }

    public create(quizId: string, title: string, description: string): Observable<string> {
        const batch = this.angularFirestore.firestore.batch();

        const round: Round = {
            uid: this.angularFirestore.createId(),
            title, description,
            created: firestore.FieldValue.serverTimestamp(),
        };

        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        const roundDoc = quizDoc
            .collection<Round>('rounds')
            .doc<Round>(round.uid);

        batch.set(quizDoc.ref, { uid: quizId, roundList: firestore.FieldValue.arrayUnion({ uid: round.uid, status: 'CREATED' }) }, { merge: true });
        batch.set(roundDoc.ref, round);

        return from(batch.commit())
            .pipe(
                map(() => round.uid),
            );
    }

    public findOne(quizId: string, roundId: string): Observable<Round> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        return quizDoc
            .collection<Round>('rounds')
            .doc<Round>(roundId)
            .valueChanges();
    }

    public findAll(quizId: string): Observable<Array<Round>> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        return quizDoc
            .collection<Round>('rounds', (ref: firestore.Query) => ref.orderBy('created'))
            .stateChanges([ 'added' ])
            .pipe(
                map((rounds) => rounds
                    .map((round: DocumentChangeAction<Round>) => round.payload.doc.data({ serverTimestamps: 'estimate' })),
                ),
            );
    }

}
