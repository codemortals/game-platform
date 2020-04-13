import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Game } from '../models';

export const gameStart = functions
    .region('europe-west2')
    .https
    .onCall(async (data: Game, context): Promise<Game> => {
        console.log(data);

        const game: Game = {
            name: data.name,
            players: [],
            status: 'CREATED',
        };

        const result = await admin.firestore().collection('games').add(game);
        game.id = result.id;
        return game;
    });
