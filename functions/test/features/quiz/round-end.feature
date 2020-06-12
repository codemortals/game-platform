Feature:
    As a host who is managing a quiz round
    I want to end the round
    So that players scores can be calculated
    And the round can be marked as over

    @HappyPath
    Scenario: Calculating scores will give results for all players
        Given there is a game created
        And there are 2 players
        And there is a quiz with 1 round
        And in round 1 of the quiz there are 4 questions
        And for question 1 of round 1 in the quiz there are 4 choices, the correct answer is choice 1
        And for question 2 of round 1 in the quiz there are 4 choices, the correct answer is choice 2
        And for question 3 of round 1 in the quiz there are 4 choices, the correct answer is choice 3
        And for question 4 of round 1 in the quiz there are 4 choices, the correct answer is choice 4
        And player 1 answers question 1 in round 1 of the quiz with choice 1
        And player 1 answers question 2 in round 1 of the quiz with choices 1,2
        And player 1 answers question 4 in round 1 of the quiz with choice 4
        When I call the "QuizRoundEnd" endpoint with:
            | quizId  | {{ game.uid }}           |
            | roundId | {{ quiz.rounds[1].uid }} |
        Then there is a collection "quizzes" with document "{{ quiz.uid }}"
        And there is a sub-collection "rounds" with document "{{ quiz.rounds[1].uid }}"
        And there is a sub-collection "results" with document "{{ game.players[1].uid }}"
        And the document contains:
            | questions | [ true, false, null, true ] |
            | score     | 2                           |
            | user      | {{ game.players[1].uid }}   |
        Then there is a collection "quizzes" with document "{{ quiz.uid }}"
        And there is a sub-collection "rounds" with document "{{ quiz.rounds[1].uid }}"
        And there is a sub-collection "results" with document "{{ game.players[2].uid }}"
        And the document contains:
            | questions | [ null, null, null, null ] |
            | score     | 0                          |
            | user      | {{ game.players[2].uid }}  |
