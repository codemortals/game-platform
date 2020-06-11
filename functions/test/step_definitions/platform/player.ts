import { Given } from 'cucumber';
import { date, internet, name, random } from 'faker';

Given(/^there (?:is|are) (\d+) player[s]?$/, async function (playerCount: number) {
    const players = Array.apply(null, Array(playerCount));
    this.storage.game.players = await Promise.all(players.map(async () => {
        const user = {
            uid: random.alphaNumeric(24),
            alias: name.firstName(),
            email: internet.email(),
            avatar: internet.avatar(),
            verified: true,
        };

        const player = {
            user: user.uid,
            score: 0,
            status: 'JOINED',
            created: date.recent(),
        };

        await this.firestore.collection('users').doc(user.uid).set(user);
        await this.firestore.collection('games').doc(this.storage.game.uid).collection('players').doc(user.uid).set(player);
        return user;
    }));
});
