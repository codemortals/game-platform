import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(
        private firebaseAuthentication: AngularFireAuth,
        private firestore: AngularFirestore,
    ) { }

    public login(provider: 'facebook'): void {
        const provision = new firebase.auth.FacebookAuthProvider();
        this.firebaseAuthentication.auth.signInWithRedirect(provision);
    }

    public checkLoggedIn(): Observable<User> {
        return this.firebaseAuthentication.authState
            .pipe(
                map((user) => {
                    if (!user) {
                        throw new Error('no user');
                    }
                    const uid = user.uid;
                    const alias = user.displayName;
                    const email = user.email;
                    const avatar = user.photoURL;
                    return { uid, alias, email, avatar };
                }),
                mergeMap(
                    (user) => from(this.firestore
                        .collection<User>('users')
                        .doc<User>(user.uid)
                        .set(user, { merge: true }))
                        .pipe(map(() => user)),
                ),
                mergeMap((user) => this.firestore.collection<User>('users').doc<User>(user.uid).valueChanges()),
                tap((user) => this.user.next(user)),
            );
    }

    public logout(): Observable<void> {
        const logout = this.firebaseAuthentication.auth.signOut();
        return from(logout)
            .pipe(
                take(1),
                map(() => this.user.next(null)),
            );
    }

}
