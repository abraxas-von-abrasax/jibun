import { GroupManager } from './services';

export * from './constants';
export * from './models';
export * from './services';
export * from './types';

export namespace GroupModule {
    export async function initialize(): Promise<void> {
        await GroupManager.initialize();
    }
}
