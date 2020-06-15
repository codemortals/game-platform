import { firestore } from 'firebase/app';

export interface Game {
    uid: string;
    name: string;
    type: 'template' | 'quiz';
    hosts: Array<string> | firestore.FieldValue;
    status: 'CREATED' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
    created: firestore.Timestamp | firestore.FieldValue;
}
