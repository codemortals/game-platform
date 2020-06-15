import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'brand-expansion',
    templateUrl: './expansion.component.html',
    styleUrls: ['./expansion.component.scss'],
    animations: [
        trigger('fade', [
            state('open', style({
                opacity: 1,
            })),
            state('closed', style({
                opacity: 0,
            })),
            transition('open => closed', [
                animate('0ms'),
            ]),
            transition('closed => open', [
                animate('500ms'),
            ]),
        ]),
    ],
})
export class BrandExpansionComponent {

    public collapsed = true;

    @Input()
    public label: string;

    @Input()
    public description: string;

    @Output()
    public onToggle = new EventEmitter<boolean>();

    public toggle(): void {
        this.collapsed = !this.collapsed;
        this.onToggle.emit(this.collapsed);
    }

}
