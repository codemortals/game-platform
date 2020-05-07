import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(
        private angularFireAuth: AngularFireAuth,
        private angularFirestore: AngularFirestore,
    ) { }

    public login(provider: 'facebook'): void {
        const provision = new auth.FacebookAuthProvider();
        this.angularFireAuth.auth.signInWithRedirect(provision);
    }

    public checkLoggedIn(): Observable<User> {
        return this.angularFireAuth.authState
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
                    (user) => from(this.angularFirestore
                        .collection<User>('users')
                        .doc<User>(user.uid)
                        .set(user, { merge: true }))
                        .pipe(map(() => user)),
                ),
                mergeMap((user) => this.angularFirestore.collection<User>('users').doc<User>(user.uid).valueChanges()),
                tap((user) => this.user.next(user)),
            );
    }

    public logout(): Observable<void> {
        const logout = this.angularFireAuth.auth.signOut();
        return from(logout)
            .pipe(
                take(1),
                map(() => this.user.next(null)),
            );
    }

}
