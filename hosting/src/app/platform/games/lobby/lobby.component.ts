import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { interval, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

import { DynamicDirective } from '@core/directives';
import { Game, Message, Player, User } from '@core/models';
import { GameService, PlayerService } from '@core/services';

@Component({
    templateUrl: './lobby.component.html',
    styleUrls: [ './lobby.component.scss' ],
})
export class GameLobbyComponent implements OnDestroy, OnInit {

    public game: Game;
    public players: Array<Player<User>> = [];
    public chat: Array<Message<User>> = [];
    public showConfig = false;
    public countdown: number;

    private isDestroyed = new Subject();
    private componentRef: ComponentRef<any>;

    @ViewChild(DynamicDirective)
    public contentPortal: DynamicDirective;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private gameService: GameService,
        private playerService: PlayerService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    public ngOnInit(): void {
        this.game = this.route.snapshot.data.gameData;

        this.gameService
            .findOne(this.route.snapshot.params.gameId)
            .pipe(
                takeUntil(this.isDestroyed),
                tap((game: Game) => {
                    if (game.status === 'IN_PROGRESS') {
                        this.openGame(5);
                    }
                }),
            )
            .subscribe((game) => this.game = game);

        this.playerService
            .findAll(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((players) => this.players = [ ...this.players, ...players ]);
    }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    public async toggleConfig(): Promise<void> {
        const container = this.contentPortal.viewContainer;
        container.clear();

        this.showConfig = !this.showConfig;

        if (this.showConfig) {
            const { LobbyComponent } = await import(`../../../games/${ this.game.type }/lobby/lobby.component`);
            const component = this.componentFactoryResolver.resolveComponentFactory(LobbyComponent);
            this.componentRef = container.createComponent(component);
        }
    }

    public startGame(): void {
        this.gameService.start(this.game.uid).subscribe();
    }

    public openGame(timer: number): void {
        this.countdown = timer;

        interval(1500)
            .pipe(
                map(() => this.countdown--),
                filter(() => this.countdown === 0)
            )
            .subscribe(
                () => this.router.navigate([ '/', 'games', this.game.uid, 'play' ])
            );
    }

}
