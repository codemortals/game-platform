import { firestore } from 'firebase/app';

export interface Player<T> {
    user: T;
    score: number;
    status: 'JOINED' | 'READY' | 'LEFT';
    created: firestore.FieldValue;
}
