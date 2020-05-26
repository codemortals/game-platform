import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const QuizQuestionCreate = functions
    .region('europe-west2')
    .firestore
    .document('/quizzes/{quizId}/rounds/{roundId}/questions/{questionId}')
    .onCreate(async (snapshot, context): Promise<any> => {
        const batch = admin.firestore().batch();

        const gameRef = admin.firestore()
            .collection('games')
            .doc(context.params.quizId);

        const quizRef = admin.firestore()
            .collection('quizzes')
            .doc(context.params.quizId);

        batch.update(gameRef, { status: 'OPEN' });

        // TODO: Possible functions can be called multiple times, so the increment needs to be idempotent
        batch.update(quizRef, { totalQuestions: admin.firestore.FieldValue.increment(1) });

        await batch.commit();
    });
