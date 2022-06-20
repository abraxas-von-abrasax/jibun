import { StoreManager } from './services';

export * from './services';
export * from './types';

export namespace StoreModule {
    export function initialize(): void {
        StoreManager.initialize();
    }
}
