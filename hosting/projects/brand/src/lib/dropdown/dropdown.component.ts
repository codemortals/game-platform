import {
    Component,
    ContentChild,
    HostListener,
    Input,
    TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { DropdownOption } from './dropdown-option';

@Component({
    selector: 'brand-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: [ './dropdown.component.scss' ],
})
export class BrandDropdownComponent implements ControlValueAccessor {

    public isOpen = false;
    public currentValue: DropdownOption;
    public isDisabled = false;

    @Input()
    public label = '';

    @Input()
    public placeholder = '';

    @Input()
    public options: Array<DropdownOption>;

    @ContentChild('optionTemplate', { static: false })
    public optionTemplate: TemplateRef<any>;

    private hasChange: (value: DropdownOption) => void = () => { };
    private isTouched = () => { };

    constructor(
        public input: NgControl,
    ) {
        this.input.valueAccessor = this;
    }

    public changeSelection(option: DropdownOption) {
        this.currentValue = option;
        this.hasChange(this.currentValue);
        this.isTouched();
    }

    public isSelected(option: DropdownOption): boolean {
        return this.currentValue === option;
    }

    public registerOnTouched(fn: () => {}): void {
        this.isTouched = fn;
    }

    public registerOnChange(fn: (value: DropdownOption) => void): void {
        this.hasChange = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public writeValue(value: any): void {
        this.currentValue = value;
    }

    @HostListener('click')
    public toggleOpen() {
        if (this.isOpen) {
            this.isTouched();
        }

        this.isOpen = !this.isOpen;
    }

}
