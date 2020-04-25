import * as firebase from 'firebase';

export interface Player<T> {
    user: T;
    score: number;
    status: 'JOINED' | 'READY' | 'LEFT';
    created: firebase.firestore.FieldValue;
}
