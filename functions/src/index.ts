import * as admin from 'firebase-admin';

admin.initializeApp();

/* Quiz API */
export * from './quiz/question-create';
export * from './quiz/round-end';
export * from './quiz/quiz-end';
