import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { of, timer } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

import { WidgetMessage } from './message';
import { WidgetChatDirective } from './chat.directive';

@Component({
    selector: 'widget-chat',
    templateUrl: './chat.component.html',
    styleUrls: [ './chat.component.scss' ],
})
export class WidgetChatComponent implements OnInit, AfterViewInit, OnChanges {

    public messageForm: FormGroup;

    private chatElement: HTMLElement;

    @Input()
    public messages: Array<WidgetMessage>;

    @Output()
    public send = new EventEmitter();

    @ViewChild(WidgetChatDirective)
    private widgetChat: WidgetChatDirective;

    constructor(
        private form: FormBuilder,
    ) { }

    public ngOnInit(): void {
        this.messageForm = this.form.group({
            message: [ '', [ Validators.required, Validators.maxLength(200) ] ],
        });
    }

    public ngAfterViewInit(): void {
        this.chatElement = this.widgetChat.getElement().nativeElement;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        timer(200)
            .pipe(
                filter(() => !!changes.messages),
                filter(() => !!this.chatElement),
                filter(() => !!changes.messages.previousValue),
                filter(() => !changes.messages.previousValue.length),
            )
            .subscribe(() => this.scrollBottom());

        of(null)
            .pipe(
                filter(() => !!changes.messages),
                filter(() => !!this.chatElement),
                filter(() => this.chatElement.scrollTop > (this.chatElement.scrollHeight - this.chatElement.clientHeight - 100)),
                delay(200),
            )
            .subscribe(() => this.scrollBottom());
    }

    public scrollBottom(): void {
        this.chatElement.scrollTop = this.chatElement.scrollHeight;
    }

    public sendMessage() {
        const message = this.messageForm.get('message').value;

        if (message.length > 0) {
            this.send.emit(message);
            this.messageForm.reset({ message: '' });
        }
    }

}
