import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[mortalDynamic]',
})
export class DynamicDirective {

    constructor(
        public viewContainer: ViewContainerRef,
    ) { }

}
