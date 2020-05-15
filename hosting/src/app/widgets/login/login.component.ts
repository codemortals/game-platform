import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'game-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
})
export class WidgetLoginComponent {

    @Output()
    public login = new EventEmitter();

    public performLogin(name: 'facebook'): void {
        this.login.emit(name);
    }

}
