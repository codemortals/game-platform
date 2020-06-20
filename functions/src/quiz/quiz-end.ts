import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { HttpsError } from 'firebase-functions/lib/providers/https';

export const QuizEnd = functions
    .region('europe-west2')
    .https
    .onCall(async (data, context) => {
        if (!context.auth) {
            throw new HttpsError('unauthenticated', 'Missing credentials');
        }

        const gameRef = await admin.firestore()
            .collection('games')
            .doc(data.quizId);

        const gameData = (await gameRef.get()).data();

        if (!gameData || !gameData.hosts.includes(context.auth.uid)) {
            throw new HttpsError('permission-denied', 'User is not a game host');
        }

        const playerRef = gameRef
            .collection('players');

        const players = await playerRef.get();

        const quizRef = admin.firestore()
            .collection('quizzes')
            .doc(data.quizId);

        const quizData = (await quizRef.get()).data();

        if (!quizData) {
            throw new HttpsError('not-found', 'No Quiz Found');
        }

        // Perform updates
        const batch = admin.firestore().batch();

        batch.update(gameRef, { status: 'COMPLETE' });

        // Update player scores for the game
        await Promise.all(players.docs.map(async (doc) => {
            const player = doc.data();
            const score = { total: 0, message: [] };

            for (const round of quizData.roundList) {
                const roundRef = quizRef.collection('rounds').doc(round.uid);
                const result = await roundRef.collection('results').doc(player.user).get();
                if (result.exists) {
                    const resultData = result.data();
                    score.total += resultData.score;
                    score.message = [ ...score.message, resultData.score ];
                } else {
                    score.message = [ ...score.message, 0 ];
                }
            }
            batch.update(doc.ref, { score: score.total, message: `Quiz Round Scores: ${ score.message.join(', ') }` });
        }));

        try {
            await batch.commit();
        } catch (error) {
            throw new HttpsError('data-loss', error.message);
        }
    });
