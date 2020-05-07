import { Component, Input } from '@angular/core';

@Component({
    selector: 'brand-label',
    templateUrl: './label.component.html',
    styleUrls: [ './label.component.scss' ],
})
export class BrandLabelComponent {

    @Input()
    public for = '';

    @Input()
    public description: string;

}
