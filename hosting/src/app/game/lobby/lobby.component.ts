import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DynamicDirective } from '@core/directives';
import { Game, Message, Player, User } from '@core/models';
import { GameService, MessageService, PlayerService } from '@core/services';

@Component({
    templateUrl: './lobby.component.html',
    styleUrls: [ './lobby.component.scss' ],
})
export class GameLobbyComponent implements OnDestroy, OnInit {

    public game: Game;
    public players: Array<Player<User>> = [];
    public chat: Array<Message<User>> = [];
    public showConfig = false;

    private isDestroyed = new Subject();
    private componentRef: ComponentRef<any>;

    @ViewChild(DynamicDirective)
    public contentPortal: DynamicDirective;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private playerService: PlayerService,
        private messageService: MessageService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    public ngOnInit(): void {
        this.game = this.route.snapshot.data.gameData;

        // TODO: Listen to game status change and redirect
        this.gameService
            .findOne(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((game) => this.game = game);

        this.playerService
            .findAll(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((players) => this.players = [ ...this.players, ...players ]);

        this.messageService
            .findAll(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((messages) => this.chat = [ ...this.chat, ...messages ]);
    }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    public sendMessage(message: string): void {
        this.messageService
            .create(this.game.uid, message)
            .subscribe();
    }

    public async toggleConfig(): Promise<void> {
        const container = this.contentPortal.viewContainer;
        container.clear();

        this.showConfig = !this.showConfig;

        if (this.showConfig) {
            const { LobbyComponent } = await import(`../../${ this.game.type }/lobby/lobby.component`);
            const component = this.componentFactoryResolver.resolveComponentFactory(LobbyComponent);
            this.componentRef = container.createComponent(component);
        }
    }

    public startGame(): void {
        // update game status on firestore
    }

}
