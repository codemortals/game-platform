import { Component, Input } from '@angular/core';

@Component({
    selector: 'brand-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: [ './overlay.component.scss' ],
})
export class BrandOverlayComponent {

    @Input()
    public open = false;

}
