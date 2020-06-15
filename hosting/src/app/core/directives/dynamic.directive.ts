import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[gameDynamic]',
})
export class DynamicDirective {

    constructor(
        public viewContainer: ViewContainerRef,
    ) { }

}
