import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services';

@Directive({
    selector: '[mortalAuthenticated]',
})
export class AuthenticatedDirective implements OnInit {

    @Input()
    public mortalAuthenticated: boolean;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService
            .user
            .subscribe((user) => {
                if (this.mortalAuthenticated === !!user) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            });
    }

}