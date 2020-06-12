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

        // Build leaderboard
        let leaderboard = players.docs.map((doc) => {
            const player = doc.data();
            return { user: player.user, rounds: Array(quizData.roundList.length).fill(null), score: 0 };
        });

        // Perform updates
        const batch = admin.firestore().batch();

        batch.update(quizRef, { status: 'COMPLETED' });

        // Calculate player scores
        await Promise.all(quizData.roundList.map(async (round, idx) => {
            const roundRef = quizRef.collection('rounds').doc(round.uid);
                leaderboard = await Promise.all(leaderboard.map(async (player) => {
                    const result = await roundRef.collection('results').doc(player.user).get();
                    const score = result.data().score;
                    player.rounds[idx] = score;
                    player.score += score;
                    return player;
                }));
        }));

        // Set player results for the round
        leaderboard.map((player) => {
            const resultRef = quizRef
                .collection('results')
                .doc(player.user);

            batch.set(resultRef, player);
        });

        try {
            await batch.commit();
        } catch (error) {
            throw new HttpsError('data-loss', error.message);
        }
    });
