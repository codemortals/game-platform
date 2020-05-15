import { Component, Input } from '@angular/core';

import { Question, Round } from '../quiz';

@Component({
    selector: 'game-question',
    templateUrl: './question.component.html',
    styleUrls: [ './question.component.scss' ],
})
export class QuestionComponent {

    @Input()
    public round: Round;

    @Input()
    public question: Question;

}
