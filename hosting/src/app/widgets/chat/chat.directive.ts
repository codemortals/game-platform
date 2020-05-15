import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[gameChat]'
})
export class WidgetChatDirective {

    constructor(
        private element: ElementRef,
    ) { }

    public getElement(): ElementRef {
        return this.element;
    }

}
