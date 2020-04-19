import * as admin from 'firebase-admin';

admin.initializeApp();

/* Game API */
export * from './game/create';
export * from './game/join';
export * from './game/score';
export * from './game/end';
