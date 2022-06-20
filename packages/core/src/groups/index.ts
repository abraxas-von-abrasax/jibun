import { GroupManager } from './services';

export * from './constants';
export * from './models';
export * from './services';
export * from './types';

export namespace GroupModule {
    export function initialize(): void {
        GroupManager.initialize();
    }
}
