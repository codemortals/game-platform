import { firestore } from 'firebase/app';

export interface Answer {
    user: string;
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

export interface QuestionSummary {
    uid: string;
}

export interface RoundResult<T> {
    questions: Array<boolean>;
    score: number;
    user: T;
}

export interface Round {
    uid: string;
    title: string;
    description?: string;
    questions?: Array<Question>;
    questionList?: Array<QuestionSummary> | firestore.FieldValue;
    created: firestore.Timestamp | firestore.FieldValue;
}

export interface RoundSummary {
    uid: string;
    status: 'CREATED' | 'COMPLETE';
}

export interface Quiz {
    uid: string;
    currentRound?: string;
    currentQuestion?: string;
    showResults?: boolean;
    rounds?: Array<Round>;
    roundList?: Array<RoundSummary> | firestore.FieldValue;
}
