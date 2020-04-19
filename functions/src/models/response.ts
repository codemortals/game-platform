export interface Response<T> {
    code: number;
    status: string;
    body?: T;
}
