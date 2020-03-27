import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable } from 'rxjs';

import { Entrant } from '../models';

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {

    constructor(
        private fireFunctions: AngularFireFunctions
    ) { }

    public create(entrant: Entrant): Observable<any> {
        entrant.quizId = 'GkvkdBEXij68ySCyyfgf';
        const createRegistration = this.fireFunctions.httpsCallable<any, any>('register');
        return createRegistration(entrant);
    }

}
