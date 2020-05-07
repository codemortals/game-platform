export interface Game {
    uid: string;
    name: string;
    type: 'template' | 'quiz';
    host: string;
    status: 'CREATED' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
}
