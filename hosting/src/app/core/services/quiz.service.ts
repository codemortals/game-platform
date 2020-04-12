import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class QuizService {

    // constructor(
    //     private firestore: AngularFirestore
    //   ) {
    //     this.firestore
    //       .collection<Quiz>('quiz')
    //       .valueChanges()
    //       .subscribe((data) => this.entrants = data);
    //   }

}
