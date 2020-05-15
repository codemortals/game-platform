import { firestore } from 'firebase/app';

export interface Question {
    uid: string;
    title: string;
    type: string;
    choices: Array<{
        option: string;
        answer: boolean;
    }>;
    created: firestore.Timestamp | firestore.FieldValue;
}

export interface Round {
    uid: string;
    title: string;
    description?: string;
    questions?: Array<Question>;
    questionList?: Array<string> | firestore.FieldValue;
    created: firestore.Timestamp | firestore.FieldValue;
}

export interface Quiz {
    uid: string;
    currentRound?: string;
    currentQuestion?: string;
    rounds?: Array<Round>;
    roundList?: Array<string> | firestore.FieldValue;
}
