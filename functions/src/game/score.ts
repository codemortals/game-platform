import * as functions from 'firebase-functions';

import { Player, Score } from '../models/game';

export const gameScore = functions
    .region('europe-west2')
    .https
    .onCall(async (data: Score, context): Promise<Player> => {
        console.log(data);
        throw new Error('not yet implemented');
    });
