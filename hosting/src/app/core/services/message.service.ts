import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Game, Message, User } from '../models';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class MessageService {

    constructor(
        private firestore: AngularFirestore,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) { }

    public create(gameId: string, content: string): Observable<void> {
        const message: Message<string> = {
            uid: this.firestore.createId(),
            user: this.authenticationService.user.getValue().uid,
            message: content,
            created: firebase.firestore.FieldValue.serverTimestamp(),
        };

        const gameRef = this.firestore
            .collection<Game>('games')
            .doc<Game>(gameId);

        const messageRef = gameRef
            .collection<Message<string>>('messages')
            .doc<Message<string>>(message.uid);

        return from(messageRef.set(message));
    }

    public findAll(gameId: string): Observable<Array<Message<User>>> {
        return this.firestore
            .collection<Game>('games')
            .doc(gameId)
            .collection<Message<string>>('messages', (ref: firebase.firestore.Query) => ref.orderBy('created'))
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
