import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

    private isDestroyed = new Subject();

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private playerService: PlayerService,
        private messageService: MessageService,
    ) { }

    public ngOnInit(): void {
        this.game = this.route.snapshot.data.gameData;

        this.gameService
            .findOne(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((game) => this.game = game);

        this.playerService
            .findAll(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((players) => this.players = players);

        this.messageService
            .findAll(this.route.snapshot.params.gameId)
            .pipe(takeUntil(this.isDestroyed))
            .subscribe((messages) => this.chat = [ ...this.chat, ...messages ]);
    }

    public ngOnDestroy(): void {
        this.isDestroyed.complete();
        this.isDestroyed.next();
    }

    public sendMessage(message: string) {
        this.messageService
            .create(this.game.uid, message)
            .subscribe();
    }

}
