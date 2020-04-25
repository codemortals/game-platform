import * as firebase from 'firebase';

export interface Message<T> {
    uid: string;
    user: T;
    message: string;
    created: firebase.firestore.FieldValue;
}
