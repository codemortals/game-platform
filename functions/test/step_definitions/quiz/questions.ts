import { Given } from 'cucumber';
import { date } from 'faker';

Given(/^player (\d+) answers question (\d+) in round (\d+) of the quiz with choice(?:s)? (\S+)$/, async function (playerNumber, questionNumber, roundNumber, chosenAnswer) {
    const player = this.storage.game.players[ playerNumber - 1 ];
    const round = this.storage.quiz.rounds[ roundNumber - 1 ];
    const question = round.questions[ questionNumber - 1 ];

    const quizDoc = this.firestore.collection('quizzes').doc(this.storage.game.uid);
    const roundDoc = quizDoc.collection('rounds').doc(round.uid);
    const questionDoc = roundDoc.collection('questions').doc(question.uid);

    const answer = {
        created: date.recent(),
        response: question.choices.filter((choice, choiceIdx) => chosenAnswer.split(',').map((x) => parseInt(x, 10)).includes(choiceIdx + 1)).map((choice) => choice.uid),
        user: player.uid,
    };
    const answerDoc = questionDoc.collection('answers').doc(player.uid);
    await answerDoc.set(answer);
});
