import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable } from 'rxjs';

import { Game } from '../models';

@Injectable({
    providedIn: 'root',
})
export class GameService {

    constructor(
        private firestore: AngularFirestore,
        private fireFunctions: AngularFireFunctions,
    ) { }

    public create(game: Game): Observable<any> {
        const createGame = this.fireFunctions.httpsCallable<any, Game>('GameCreate');
        return createGame(game);
    }

    public list(): Observable<Array<Game>> {
        return this.firestore
            .collection<Game>('games')
            .valueChanges();
    }

}
