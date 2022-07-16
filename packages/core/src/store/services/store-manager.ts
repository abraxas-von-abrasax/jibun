import { UserStoreFactory } from '../../users';
import { builtinResources } from '../constants/builtin-resources';
import { CannotFindStoreError, ResourceNotRegisteredError } from '../errors';
import { Store } from '../types';
import { GroupStoreFactory } from '../../groups';

type State = {
    initialized: boolean;
    stores: Map<string, Store>;
};

const state: State = {
    initialized: false,
    stores: new Map(),
};

export namespace StoreManager {
    export function initialize() {
        if (state.initialized) {
            return;
        }

        for (const resource of builtinResources) {
            switch (resource) {
                case 'users':
                    state.stores.set('users', UserStoreFactory.getStore());
                    break;
                case 'groups':
                    state.stores.set('groups', GroupStoreFactory.getStore());
            }
        }

        state.initialized = true;
    }

    export function getStore<T = unknown>(resource: string): Store<T> {
        if (!isResourceRegistered(resource)) {
            throw new ResourceNotRegisteredError(resource);
        }

        const store = state.stores.get(resource) as Store<T> | undefined;

        if (!store) {
            throw new CannotFindStoreError(resource);
        }

        return store;
    }
}

function isResourceRegistered(resource: string): boolean {
    return state.stores.has(resource);
}
