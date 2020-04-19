import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';

import { UserAccount } from '../models';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    public account: BehaviorSubject<UserAccount> = new BehaviorSubject<UserAccount>(null);

    constructor(
        private firebaseAuthentication: AngularFireAuth,
        private firestore: AngularFirestore,
    ) { }

    public login(provider: 'facebook'): void {
        const provision = new firebase.auth.FacebookAuthProvider();
        this.firebaseAuthentication.auth.signInWithRedirect(provision);
    }

    public checkLoggedIn(): Observable<UserAccount> {
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
                    (account) => from(this.firestore
                        .collection<UserAccount>('accounts')
                        .doc<UserAccount>(account.uid)
                        .set(account, { merge: true }))
                        .pipe(map(() => account)),
                ),
                mergeMap((account) => this.firestore.collection<UserAccount>('accounts').doc<UserAccount>(account.uid).valueChanges()),
                tap((userAccount) => this.account.next(userAccount))
            );
    }

    public logout(): Observable<void> {
        const logout = this.firebaseAuthentication.auth.signOut();
        return from(logout)
            .pipe(
                take(1),
                map(() => this.account.next(null)),
            );
    }

}
