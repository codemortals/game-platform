import * as firebase from 'firebase';

export interface WidgetMessage {
    user: {
        alias: string;
        avatar: string;
    };
    message: string;
    created: firebase.firestore.Timestamp;
}
