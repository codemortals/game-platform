import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private firestore: AngularFirestore,
    ) { }

    public findOne(userId: string): Observable<User> {
        return this.firestore.collection<User>('users')
            .doc<User>(userId)
            .get()
            .pipe(
                map((user: firebase.firestore.DocumentData): User => user.data()),
            );
    }

}
