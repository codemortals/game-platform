import * as admin from 'firebase-admin';

export interface Player {
    uid: string;
    score: number;
    status: 'JOINED' | 'READY' | 'LEFT';
    game: string;
    user: string;
    created: admin.firestore.Timestamp;
    updated: admin.firestore.Timestamp;
}
