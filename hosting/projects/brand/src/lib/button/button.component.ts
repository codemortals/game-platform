import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'brand-button, [brand-button], [brand-button-warning], [brand-button-plain]',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
    encapsulation: ViewEncapsulation.None,
})
export class BrandButtonComponent {

    private isDisabled = false;

    @HostBinding('class.brand-button')
    true;

    @HostBinding('attr.type')
    @Input()
    public type = 'button';

    @HostBinding('attr.disabled')
    @Input()
    get disabled(): boolean | string | null {
        return this.isDisabled ? 'disabled' : null;
    }
    set disabled(value: boolean | string) {
        this.isDisabled = coerceBooleanProperty(value);
    }

}
