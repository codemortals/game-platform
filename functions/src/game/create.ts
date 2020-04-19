import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Response, Game } from '../models';

export const GameCreate = functions
    .region('europe-west2')
    .https
    .onCall(async (data: Game, context): Promise<Response<Game>> => {
        if (!context.auth) {
            return { status: 'unauthorised', code: 401 };
        }

        const game: Game = {
            name: data.name,
            type: 'QUIZ',
            host: context.auth.uid,
            players: [],
            status: 'CREATED',
        };

        const result = await admin.firestore().collection('games').add(game);
        game.id = result.id;
        return { status: 'ok', code: 200, body: game };
    });
