import { Given } from 'cucumber';
import { name, random } from 'faker';

Given(/^there is a game created$/, async function () {
    this.storage.game = { uid: random.alphaNumeric(24) };
    this.storage.hostId = random.alphaNumeric(24);

    const data = {
        name: name.jobType(),
        hosts: [ this.storage.hostId ],
    };

    await this.firestore.collection('games').doc(this.storage.game.uid).set(data);
});
