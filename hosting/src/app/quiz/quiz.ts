import { firestore } from 'firebase/app';

export interface Question {
    uid: string;
    title: string;
    type: string;
    choices: Array<{
        option: string;
        answer: boolean;
    }>;
    created: firestore.FieldValue;
}

export interface Round<T> {
    uid: string;
    title: string;
    description?: string;
    questions?: Array<T>;
    totalQuestions?: number;
    order: number;
}

export interface Quiz {
    uid: string;
    rounds?: Array<Round<string>>;
    currentRound?: number;
    currentQuestion?: number;
}
