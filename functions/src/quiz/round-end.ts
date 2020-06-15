import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { HttpsError } from 'firebase-functions/lib/providers/https';

export const QuizRoundEnd = functions
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

        const roundRef = quizRef
            .collection('rounds')
            .doc(data.roundId);

        const round = (await roundRef.get()).data();

        // Build leaderboard
        const leaderboard = players.docs.reduce((leaders, doc) => {
            const player = doc.data();
            leaders[ player.user ] = { user: player.user, questions: Array(round.questionList.length).fill(null), score: 0 };
            return leaders;
        }, {});

        // Perform updates
        const batch = admin.firestore().batch();

        const roundList = quizData.roundList.map((entry: any) => {
            if (entry.uid === data.roundId) {
                entry.status = 'COMPLETED';
            }
            return entry;
        });
        batch.update(quizRef, { roundList });

        // Calculate player scores
        await Promise.all(round.questionList.map(async (question, questionIdx): Promise<void> => {
            const questionRef = roundRef.collection('questions').doc(question.uid);
            const choices = await questionRef.collection('choices').get();
            const validAnswers = choices.docs
                .map((choice) => choice.data())
                .filter((choice) => choice.correct)
                .map((choice) => choice.uid);

            const answerRef = await questionRef
                .collection('answers')
                .get();

            answerRef.docs.map((answer) => {
                const answerData = answer.data();
                if (!answerData) {
                    return;
                }

                const user = answerData.user;
                const player = leaderboard[ user ];

                if (validAnswers.length !== answerData.response.length) {
                    player.questions[ questionIdx ] = false;
                    return;
                }

                const checkedAnswers = validAnswers.reduce((matches, valid) => {
                    if (answerData.response.includes(valid)) {
                        return [ ...matches, valid ];
                    }
                    return matches;
                }, []);

                if (validAnswers.length === checkedAnswers.length) {
                    player.score++;
                    player.questions[ questionIdx ] = true;
                } else {
                    player.questions[ questionIdx ] = false;
                }
                leaderboard[ user ] = player;
            });
        }));

        // Set player results for the round
        Object.keys(leaderboard).map((key) => {
            const resultRef = roundRef
                .collection('results')
                .doc(key);

            batch.set(resultRef, leaderboard[ key ]);
        });

        try {
            await batch.commit();
        } catch (error) {
            throw new HttpsError('data-loss', error.message);
        }
    });
