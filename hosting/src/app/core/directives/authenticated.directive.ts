import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services';

@Directive({
    selector: '[gameAuthenticated]',
})
export class AuthenticatedDirective implements OnInit {

    @Input()
    public gameAuthenticated: boolean;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService
            .user
            .subscribe((user) => {
                if (this.gameAuthenticated === !!user) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            });
    }

}
