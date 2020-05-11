import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
    templateUrl: './lobby.component.html',
    styleUrls: [ './lobby.component.scss' ],
})
export class LobbyComponent implements OnDestroy {


    private isDestroyed = new Subject();

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

}
