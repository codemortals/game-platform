import { Component, Input } from '@angular/core';

import { WidgetPlayer } from './player';

@Component({
    selector: 'widget-player',
    templateUrl: './player.component.html',
    styleUrls: [ './player.component.scss' ],
})
export class WidgetPlayerComponent {

    @Input()
    public player: WidgetPlayer;

}
