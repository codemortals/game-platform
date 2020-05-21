import { firestore } from 'firebase/app';

export interface Answer {
    userId: string;
    response: Array<string>;
    created: firestore.Timestamp | firestore.FieldValue;
}

export interface Choice {
    uid: string;
    text: string;
    correct?: boolean;
}

export interface Question {
    uid: string;
    text: string;
    type: string;
    choices?: Array<Choice>;
    choiceList: Array<Choice>;
    answers?: Array<Answer>;
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
