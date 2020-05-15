import { Component, Input } from '@angular/core';

import { Player, User } from '@core/models';

@Component({
    selector: 'game-player',
    templateUrl: './player.component.html',
    styleUrls: [ './player.component.scss' ],
})
export class WidgetPlayerComponent {

    @Input()
    public player: Player<User>;

}
