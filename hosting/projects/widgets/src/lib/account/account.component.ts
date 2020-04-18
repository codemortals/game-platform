import { Component, EventEmitter, Input, Output } from '@angular/core';

import { WidgetAccount } from './account';

@Component({
    selector: 'widget-account',
    templateUrl: './account.component.html',
    styleUrls: [ './account.component.scss' ],
})
export class WidgetAccountComponent {

    @Input()
    public account: WidgetAccount;

    @Output()
    public logout = new EventEmitter();

    public performLogout() {
        this.logout.emit();
    }

}
