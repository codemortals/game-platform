import { firestore } from 'firebase/app';

export interface Message<T> {
    uid: string;
    user: T;
    message: string;
    created: firestore.Timestamp | firestore.FieldValue;
}
