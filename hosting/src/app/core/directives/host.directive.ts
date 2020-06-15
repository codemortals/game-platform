import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '@core/services';

@Directive({
    selector: '[gameHost]',
})
export class HostDirective implements OnInit {

    @Input()
    public gameHost: Array<string>;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authenticationService: AuthenticationService,
    ) { }

    public ngOnInit(): void {
        this.authenticationService
            .user
            .subscribe((user) => {
                if (user && this.gameHost.includes(user.uid)) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            });
    }

}
