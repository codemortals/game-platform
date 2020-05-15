import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@core/models';

@Component({
    selector: 'game-account',
    templateUrl: './account.component.html',
    styleUrls: [ './account.component.scss' ],
})
export class WidgetAccountComponent {

    @Input()
    public account: User;

    @Output()
    public logout = new EventEmitter();

    public performLogout() {
        this.logout.emit();
    }

}
