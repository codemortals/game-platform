import { Component, Input } from '@angular/core';

import { User } from '@core/models';

@Component({
    selector: 'game-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: [ './avatar.component.scss' ],
})
export class WidgetAvatarComponent {

    @Input()
    public user: User;

}
