import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private angularFirestore: AngularFirestore,
    ) { }

    public findOne(userId: string): Observable<User> {
        return this.angularFirestore.collection<User>('users')
            .doc<User>(userId)
            .get()
            .pipe(
                map((user: firestore.DocumentData): User => user.data()),
            );
    }

}
