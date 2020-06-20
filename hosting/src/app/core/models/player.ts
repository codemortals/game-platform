import { firestore } from 'firebase/app';

export interface Player<T> {
    user: T;
    score?: number;
    message?: string;
    created: firestore.FieldValue;
}
