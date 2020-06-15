import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Message, User } from '../models';
import { MessageService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class MessageListResolve implements Resolve<Array<Message<User>>> {

    constructor(
        private messageService: MessageService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Message<User>>> {
        return this.messageService
            .findAll(route.params.gameId)
            .pipe(take(1));
    }

}
