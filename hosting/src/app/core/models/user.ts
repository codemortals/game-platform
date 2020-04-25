export interface User {
    uid: string;
    alias: string;
    email: string;
    avatar: string;
    level?: {
        display: number;
        experience: number;
    };
}
