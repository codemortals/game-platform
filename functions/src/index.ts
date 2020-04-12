import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Entrant } from './models';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

export const register = functions.https.onCall((data: Entrant, context): Promise<Entrant> => {
    console.log(data);

    const entrant: Entrant = {
        gameId: data.gameId,
        alias: data.alias,
        email: data.email,
        location: data.location,
    };

    return admin.firestore()
        .collection('entrants')
        .add(entrant)
        .then((write) => {
            entrant.id = write.id;

            return entrant;
        })
        .then(() => admin.firestore()
            .collection('quizzes')
            .doc(entrant.gameId)
            .update({ entrants: admin.firestore.FieldValue.arrayUnion(entrant.id) }))
        .then(() => entrant);
});
