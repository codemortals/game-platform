import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

/* Quiz API */
export * from './quiz/question-create';
export * from './quiz/round-end';
