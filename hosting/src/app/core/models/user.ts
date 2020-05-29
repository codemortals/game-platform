export interface User {
    uid: string;
    alias: string;
    email: string;
    avatar: string;
    verified: boolean;
    level?: {
        display: number;
        experience: number;
    };
}
