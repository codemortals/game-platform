import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Entrant } from '../core/models';

@Component({
    selector: 'mortal-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [ './quiz.component.scss' ],
})
export class QuizComponent implements OnInit {

    public entrants: any = [];


    constructor(
        private firestore: AngularFirestore,
    ) {
        // @TODO:filter by quiz
        this.firestore
            .collection<Entrant>('entrants')
            .valueChanges()
            .subscribe((data) => this.entrants = data);
    }

    public ngOnInit(): void {
    }

}
