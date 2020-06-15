import { Component, Input } from '@angular/core';

@Component({
    selector: 'brand-notification',
    templateUrl: './notification.component.html',
    styleUrls: [ './notification.component.scss' ],
})
export class BrandNotificationComponent {

    public position: 'flex-start' | 'center' | 'flex-end' = 'flex-start';

    @Input()
    public severity: 'success' | 'information' | 'warning' | 'error' = 'information';

    @Input()
    set align(position: 'start' | 'center' | 'end') {
        this.position = position === 'center' ? position : <any> `flex-${ position }`;
    }
    get align(): 'start' | 'center' | 'end' {
        return <any> this.position.replace('flex-', '');
    }

}
