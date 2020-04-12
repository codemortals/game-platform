import { Result } from './result';

export interface Entrant {
    id?: string;
    gameId: string;
    alias: string;
    email: string;
    location: string;
    score?: number;
    results?: Result[];
}
