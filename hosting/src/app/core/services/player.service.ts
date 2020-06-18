import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Game, Message, Player, User } from '../models';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {

    constructor(
        private angularFirestore: AngularFirestore,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) { }

    public create(gameId: string): Observable<void> {
        const player: Player<string> = {
            user: this.authenticationService.user.getValue().uid,
            created: firestore.FieldValue.serverTimestamp(),
        };

        const gameDoc = this.angularFirestore
            .collection<Game>('games')
            .doc<Game>(gameId);

        const playerDoc = gameDoc
            .collection<Player<string>>('players')
            .doc<Player<string>>(player.user);

        return playerDoc.get()
            .pipe(
                mergeMap((entry) => {
                    if (entry.exists) {
                        return of(null);
                    }
                    return playerDoc.set(player, { merge: true });
                }),
            );
    }

    public findAll(gameId: string, order = 'created'): Observable<Array<Player<User>>> {
        return this.angularFirestore
            .collection<Game>('games')
            .doc(gameId)
            .collection<Message<string>>('players', (ref: firebase.firestore.Query) => ref.orderBy(order, 'desc'))
            .stateChanges([ 'added' ])
            .pipe(
                map((messages) => messages
                    .map((message: DocumentChangeAction<Message<string>>) => message.payload.doc.data({ serverTimestamps: 'estimate' })),
                ),
                mergeMap(
                    (messages) => {
                        let messageList = of([]);
                        if (messages.length) {
                            messageList = forkJoin(
                                ...messages.map((message) => this.userService
                                    .findOne(message.user)
                                    .pipe(
                                        map((user) => ({ ...message, user })),
                                    ),
                                ),
                            );
                        }
                        return messageList;
                    },
                ),
            );
    }

}
