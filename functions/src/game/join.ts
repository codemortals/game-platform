import * as functions from 'firebase-functions';

export const gameJoin = functions
    .region('europe-west2')
    .firestore
    .document('players')
    .onCreate(async (snapshot, context): Promise<void> => {
        console.log(snapshot);
        throw new Error('not yet implemented');
    });
