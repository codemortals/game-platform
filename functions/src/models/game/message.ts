import * as admin from 'firebase-admin';

export interface Message {
    message: string;
    created: admin.firestore.Timestamp;
    user: string;
}
