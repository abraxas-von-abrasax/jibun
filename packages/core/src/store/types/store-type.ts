export enum BuiltinStoreType {
    IN_MEMORY = 'in_memory',
}

export type StoreType = BuiltinStoreType | string;
export const StoreType = { ...BuiltinStoreType };
