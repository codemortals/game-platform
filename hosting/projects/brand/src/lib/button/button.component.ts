import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'brand-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
})
export class BrandButtonComponent implements OnInit {

    @Input()
    public type: 'button' | 'submit' = 'button';

    @Input()
    public disabled = false;

    @HostBinding('class.brand-button')
    true;

    constructor() { }

    ngOnInit(): void {
    }

}
