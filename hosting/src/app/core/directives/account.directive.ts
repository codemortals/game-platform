import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services';

@Directive({
    selector: '[gameAccount]',
})
export class AccountDirective implements OnInit {

    @Input()
    public gameAccount: string;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService
            .user
            .subscribe((user) => {
                if (this.gameAccount === user.uid) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            });
    }

}
