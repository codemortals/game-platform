import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { UserService } from '@core/services';

import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Quiz, Round, RoundResult } from './quiz.model';
import { User } from '@core/models';

@Injectable()
export class ResultService {

    constructor(
        private angularFirestore: AngularFirestore,
        private userService: UserService,
    ) { }

    findAll(quizId: string, roundId: string): Observable<Array<RoundResult<User>>> {
        const quizDoc = this.angularFirestore
            .collection<Quiz>('quizzes')
            .doc<Quiz>(quizId);

        const roundDoc = quizDoc
            .collection<Round>('rounds')
            .doc<Round>(roundId);

        return roundDoc
            .collection<RoundResult<string>>('results', (ref: firebase.firestore.Query) => ref.orderBy('score', 'desc').limit(10))
            .stateChanges([ 'added' ])
            .pipe(
                map((results) => results
                    .map((result: DocumentChangeAction<RoundResult<string>>) => result.payload.doc.data()),
                ),
                mergeMap(
                    (results) => {
                        let resultList = of([]);
                        if (results.length) {
                            resultList = forkJoin(
                                ...results.map((result) => this.userService
                                    .findOne(result.user)
                                    .pipe(
                                        map((user) => ({ ...result, user })),
                                    ),
                                ),
                            );
                        }
                        return resultList;
                    },
                ),
            );
    }

}
