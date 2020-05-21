import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { firestore } from 'firebase/app';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from '../models';
import { AuthenticationService } from './authentication.service';
import { PlayerService } from './player.service';

@Injectable({
    providedIn: 'root',
})
export class GameService {

    constructor(
        private angularFirestore: AngularFirestore,
        private fireFunctions: AngularFireFunctions,
        private playerService: PlayerService,
        private authenticationService: AuthenticationService,
    ) { }

    public create(gameName: string): Observable<Game> {
        const game: Game = {
            uid: this.angularFirestore.createId(),
            name: gameName,
            type: 'quiz',
            hosts: firestore.FieldValue.arrayUnion(this.authenticationService.user.getValue().uid),
            status: 'CREATED',
        };

        const gameRef = this.angularFirestore
            .collection<Game>('games')
            .doc<Game>(game.uid);

        return from(gameRef.set(game))
            .pipe(map(() => game));
    }

    public start(gameId: string): Observable<void> {
        const gameRef = this.angularFirestore
            .collection<Game>('games')
            .doc<Game>(gameId);

        return from(gameRef.update({ status: 'IN_PROGRESS' }));
    }

    public findAll(): Observable<Array<Game>> {
        return this.angularFirestore
            .collection<Game>('games')
            .valueChanges();
    }

    public findOne(gameId: string): Observable<Game> {
        return this.angularFirestore
            .collection<Game>('games')
            .doc<Game>(gameId)
            .valueChanges();
    }

}
