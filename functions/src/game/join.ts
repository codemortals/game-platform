import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Game, Player, Response } from '../models';

export const GameJoin = functions
    .region('europe-west2')
    .https
    .onCall(async (data: { gameId: string }, context): Promise<Response<Game>> => {
        if (!context.auth) {
            return { status: 'unauthorised', code: 401 };
        }

        const batch = admin.firestore().batch();

        const playerQuery = await admin.firestore()
            .collection('players')
            .where('game', '==', data.gameId)
            .where('user', '==', context.auth.uid)
            .get();

        if (!playerQuery.empty) {
            playerQuery.forEach((playerDoc) =>
                batch.update(playerDoc.ref, {
                    status: 'JOINED',
                    updated: admin.firestore.Timestamp.now(),
                }),
            );
        } else {

            const player: Player = {
                uid: admin.firestore().collection('players').doc().id,
                score: 0,
                status: 'JOINED',
                user: context.auth.uid,
                game: data.gameId,
                created: admin.firestore.Timestamp.now(),
                updated: admin.firestore.Timestamp.now(),
            };

            const playerRef = admin.firestore()
                .collection('players')
                .doc(player.uid);

            const gameRef = admin.firestore()
                .collection('games')
                .doc(data.gameId);

            batch.set(playerRef, player);
            batch.update(gameRef, { players: admin.firestore.FieldValue.arrayUnion(player.uid) });
        }

        await batch.commit();

        return { status: 'ok', code: 201 };
    });
