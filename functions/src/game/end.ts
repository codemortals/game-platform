import * as functions from 'firebase-functions';

import { Game } from '../models/game';

export const gameEnd = functions
    .region('europe-west2')
    .https
    .onCall(async (data: Game, context): Promise<Game> => {
        console.log(data);
        throw new Error('not yet implemented');
    });
