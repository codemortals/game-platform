export interface Game {
    id?: string;
    name: string;
    players: Array<string>;
    status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETE';
}
