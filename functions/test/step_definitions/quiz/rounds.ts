import { Given } from 'cucumber';
import { date, random } from 'faker';

Given(/^there is a quiz with (\d+) round(?:s)?$/, async function (roundCount) {
    const quiz: any = {
        uid: this.storage.game.uid,
    };

    const quizDoc = this.firestore.collection('quizzes').doc(this.storage.game.uid);
    await quizDoc.set(quiz);

    quiz.rounds = await Promise.all(Array.apply(null, Array(roundCount)).map(async (): Promise<any> => {
        const round: any = {
            uid: random.alphaNumeric(24),
            title: random.word(),
            description: random.words(10),
            created: date.recent(),
        };

        const roundDoc = quizDoc.collection('rounds').doc(round.uid);
        await roundDoc.set(round);
        return round;
    }));

    quiz.roundList = quiz.rounds.map((round) => ({ uid: round.uid, status: 'CREATED' }));
    await quizDoc.update({ roundList: quiz.roundList });
    this.storage.quiz = quiz;
});

Given(/^in round (\d+) of the quiz there (?:is|are) (\d+) question(?:s)?$/, async function (roundIdx, questionCount) {
    const quiz = this.storage.quiz;

    if (!quiz) {
        throw new Error('Quiz has not been created');
    }

    const quizDoc = this.firestore.collection('quizzes').doc(quiz.uid);
    const roundId = quiz.roundList[ roundIdx - 1 ].uid;
    const roundDoc = quizDoc.collection('rounds').doc(roundId);

    const round = quiz.rounds.find((it) => it.uid === roundId);
    round.questions = await Promise.all(Array.apply(null, Array(questionCount)).map(async (): Promise<any> => {
        const question = {
            uid: random.alphaNumeric(24),
            text: random.words(5),
            type: 'standard',
            created: date.recent(),
        };

        const questionDoc = roundDoc.collection('questions').doc(question.uid);
        await questionDoc.set(question);
        return question;
    }));

    round.questionList = round.questions.map((question) => ({ uid: question.uid }));
    await roundDoc.update({ questionList: round.questionList });

    this.storage.quiz = quiz;
});

Given(/^for question (\d+) of round (\d+) in the quiz there are (\d+) choice(?:s)?, the correct answer is choice (\S+)$/, async function (questionIdx, roundIdx, choiceCount, choiceValid) {
    const quiz = this.storage.quiz;

    if (!quiz) {
        throw new Error('Quiz has not been created');
    }

    const quizDoc = this.firestore.collection('quizzes').doc(quiz.uid);
    const roundId = quiz.roundList[ roundIdx - 1 ].uid;
    const roundDoc = quizDoc.collection('rounds').doc(roundId);

    const round = quiz.rounds.find((it) => it.uid === roundId);
    const questionId = round.questionList[ questionIdx - 1 ].uid;
    const questionDoc = roundDoc.collection('questions').doc(questionId);

    const question = round.questions.find((it) => it.uid === questionId);
    question.choices = await Promise.all(Array.apply(null, Array(choiceCount)).map(async (it, idx): Promise<any> => {
        const choice = {
            uid: random.alphaNumeric(24),
            text: random.word(),
            correct: choiceValid.split(',').map((x) => parseInt(x, 10)).includes(idx + 1),
        };

        const choiceDoc = questionDoc.collection('choices').doc(choice.uid);
        await choiceDoc.set(choice);
        return choice;
    }));

    question.choiceList = question.choices.map((choice) => ({ uid: choice.uid, text: choice.text }));
    await questionDoc.update({ choiceList: question.choiceList });

    this.storage.quiz = quiz;
});
