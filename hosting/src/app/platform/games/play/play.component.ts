import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DynamicDirective } from '@core/directives';
import { Game } from '@core/models';

@Component({
    templateUrl: './play.component.html',
    styleUrls: [ './play.component.scss' ],
})
export class GamePlayComponent implements OnInit, AfterViewInit {

    public game: Game;

    private componentRef: ComponentRef<any>;

    @ViewChild(DynamicDirective)
    public contentPortal: DynamicDirective;

    constructor(
        private route: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    public ngOnInit(): void {
        this.game = this.route.snapshot.data.gameData;
    }

    public async ngAfterViewInit(): Promise<void> {
        const container = this.contentPortal.viewContainer;
        container.clear();

        const { PlayComponent } = await import(`../../../games/${ this.game.type }/play/play.component`);
        const component = this.componentFactoryResolver.resolveComponentFactory(PlayComponent);
        this.componentRef = container.createComponent(component);
    }

}
