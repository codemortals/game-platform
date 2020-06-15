import { Directive, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Subject } from 'rxjs';

import { BrandInputControl } from './input.control';

@Directive({
    selector: 'input[brandInput], textarea[brandInput]',
    providers: [
        { provide: BrandInputControl, useExisting: BrandInputDirective },
    ],
})
export class BrandInputDirective {

    public changes: Subject<void> = new Subject<void>();
    public focus: Subject<boolean> = new Subject<boolean>();

    constructor(
        @Optional() @Self() public ngControl: NgControl,
    ) { }

    public setValidator(parent: NgControl) {
        this.ngControl.control.setValidators(parent.control.validator);
        this.ngControl.control.updateValueAndValidity();
    }

    @HostListener('focus')
    public triggerFocus(): void {
        this.focus.next(true);
    }

    @HostListener('blur')
    public triggerBlur(): void {
        this.changes.next();
        this.focus.next(false);
    }

}
