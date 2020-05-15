import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Game, Message, User } from '@core/models';
import { MessageService } from '@core/services';

import { of, Subject, timer } from 'rxjs';
import { delay, filter, map, takeUntil } from 'rxjs/operators';

import { WidgetChatDirective } from './chat.directive';

@Component({
    selector: 'game-chat',
    templateUrl: './chat.component.html',
    styleUrls: [ './chat.component.scss' ],
})
export class WidgetChatComponent implements OnInit, AfterViewInit, OnDestroy {

    public messageForm: FormGroup;

    private chatElement: HTMLElement;
    private isDestroyed = new Subject();

    public messages: Array<Message<User>> = [];

    @Input()
    public game: Game;

    @ViewChild(WidgetChatDirective)
    private gameChat: WidgetChatDirective;

    constructor(
        private form: FormBuilder,
        private messageService: MessageService,
    ) { }

    public ngOnInit(): void {
        this.messageService
            .findAll(this.game.uid)
            .pipe(
                takeUntil(this.isDestroyed),
                map((messages) => this.messages = [ ...this.messages, ...messages ]),
                // filter(() => !!this.chatElement),
                filter(() => this.chatElement.scrollTop > (this.chatElement.scrollHeight - this.chatElement.clientHeight - 100)),
                delay(200),
            )
            .subscribe(() => {
                this.scrollBottom();
            });

        this.messageForm = this.form.group({
            message: [ '', [ Validators.required, Validators.maxLength(200) ] ],
        });
    }

    public ngAfterViewInit(): void {
        this.chatElement = this.gameChat.getElement().nativeElement;
    }

    public ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }

    public scrollBottom(): void {
        this.chatElement.scrollTop = this.chatElement.scrollHeight;
    }

    public sendMessage() {
        const message = this.messageForm.get('message').value;

        this.messageService
            .create(this.game.uid, message)
            .subscribe(
                () => this.messageForm.reset({ message: '' })
            );
    }

}
