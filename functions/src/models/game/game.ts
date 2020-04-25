import { Message } from "./message";

export interface Game {
    uid: string;
    name: string;
    type: 'QUIZ';
    host: string;
    players: Array<string>;
    chat: Array<Message>;
    status: 'CREATED' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
}
