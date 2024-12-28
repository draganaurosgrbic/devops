export interface Page<T> {
    results: T[];
    links: {
        base: string;
        prev: string;
        next: string;
    };
    offset: number;
    limit: number;
    size: number;
}
