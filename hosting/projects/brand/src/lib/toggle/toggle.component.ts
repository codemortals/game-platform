import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'brand-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: [ './toggle.component.scss' ],
})
export class BrandToggleComponent implements ControlValueAccessor {

    public isChecked = false;
    public isDisabled = false;

    @Input()
    public label: string;

    @Input()
    public name: string;

    private hasChange: (value: boolean) => void = () => {};
    private isTouched = () => {};

    set value(value: boolean) {
        this.isChecked = value;
        this.hasChange(this.isChecked);
        this.isTouched();
    }
    get value(): boolean {
        return this.isChecked;
    }

    constructor(
        public input: NgControl,
    ) {
        this.input.valueAccessor = this;
    }

    public registerOnChange(fn: (value: boolean) => void): void {
        this.hasChange = fn;
        this.hasChange(this.value);
    }

    public registerOnTouched(fn: () => {}): void {
        this.isTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(value: boolean): void {
        this.value = coerceBooleanProperty(value);
    }

    @HostListener('click')
    public toggle(): void {
        if (!this.isDisabled) {
            this.value = !this.value;
        }
    }

}
