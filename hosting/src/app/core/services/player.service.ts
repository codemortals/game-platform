import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { forkJoin, Observable, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { Game, Message, Player, User } from '../models';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {

    constructor(
        private firestore: AngularFirestore,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) { }

    public create(gameId: string): Observable<void> {
        const player: Player<string> = {
            user: this.authenticationService.user.getValue().uid,
            score: 0,
            status: 'JOINED',
            created: firebase.firestore.FieldValue.serverTimestamp(),
        };

        const gameRef = this.firestore
            .collection<Game>('games')
            .doc<Game>(gameId);

        const playerRef = gameRef
            .collection<Player<string>>('players')
            .doc<Player<string>>(player.user);

        return playerRef.get()
            .pipe(
                filter((entry) => !entry.exists),
                mergeMap(() => playerRef.set(player, { merge: true })),
            );
    }

    public findAll(gameId: string): Observable<Array<Player<User>>> {
        return this.firestore
            .collection<Game>('games')
            .doc(gameId)
            .collection<Message<string>>('players', (ref: firebase.firestore.Query) => ref.orderBy('created'))
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
