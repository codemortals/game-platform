import { Component, Input } from '@angular/core';

import { Round } from '../quiz.model';

@Component({
    selector: 'game-summary',
    templateUrl: './summary.component.html',
    styleUrls: [ './summary.component.scss' ],
})
export class SummaryComponent {

    @Input()
    public rounds: Array<Round>;

    @Input()
    public currentRound: Round;

}
