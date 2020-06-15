import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-layout-column',
    templateUrl: './layout-column.component.html',
    styleUrls: [ './layout-column.component.scss' ],
})
export class WidgetLayoutColumnComponent {

    @Input()
    public reverse = false;

}
