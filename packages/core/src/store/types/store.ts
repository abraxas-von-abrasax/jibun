export interface Store<T = unknown> {
    get(id: string): Promise<T | null>;
    save(entity: T): Promise<boolean>;
}
