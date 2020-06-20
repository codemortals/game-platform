import { Given } from 'cucumber';
import { date, internet, name, random } from 'faker';

Given(/^there (?:is|are) (\d+) player[s]? in the game$/, async function (playerCount: number) {
    const players = Array.apply(null, Array(playerCount));
    this.storage.game.players = await Promise.all(players.map(() => addPlayer(this.firestore, this.storage.game.uid)));
});

Given(/^there (?:is|are) (\d+) player[s]? who join[s]? the game$/, async function (playerCount: number) {
    const players = Array.apply(null, Array(playerCount));
    const newPlayers = await Promise.all(players.map(() => addPlayer(this.firestore, this.storage.game.uid)));
    this.storage.game.players = [ ...this.storage.game.players, ...newPlayers ];
});

const addPlayer = async (firestore, gameId) => {
    const user = {
        uid: random.alphaNumeric(24),
        alias: name.firstName(),
        email: internet.email(),
        avatar: internet.avatar(),
        verified: true,
    };

    const player = {
        user: user.uid,
        created: date.recent(),
    };

    await firestore.collection('users').doc(user.uid).set(user);
    await firestore.collection('games').doc(gameId).collection('players').doc(user.uid).set(player);
    return user;
};
