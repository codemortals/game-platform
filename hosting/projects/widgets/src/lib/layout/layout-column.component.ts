import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'widget-layout-column',
    templateUrl: './layout-column.component.html',
    styleUrls: [ './layout-column.component.scss' ],
})
export class WidgetLayoutColumnComponent {

    @Input()
    public reverse = false;

}
