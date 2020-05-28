import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthenticationService } from '../services';

@Directive({
    selector: '[gameVerified]',
})
export class VerifiedDirective implements OnInit {

    @Input()
    public gameVerified = true;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService
            .user
            .subscribe((user) => {
                if (user && this.gameVerified === user.verified) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            });
    }

}
