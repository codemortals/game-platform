export interface Game {
    id?: string;
    name: string;
    type: 'QUIZ';
    host: string;
    players: Array<string>;
    status: 'CREATED' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
}
