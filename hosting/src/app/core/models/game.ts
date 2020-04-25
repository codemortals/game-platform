export interface Game {
    uid?: string;
    name: string;
    type?: 'QUIZ';
    host?: string;
    status?: 'CREATED' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
}
