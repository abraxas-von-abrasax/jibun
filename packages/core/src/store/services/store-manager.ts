import { UserStoreFactory } from '../../users';
import { builtinResources } from '../constants/builtin-resources';
import { StoreType } from '../types';
import { Store } from '../types/store';

type State = {
    initialized: boolean;
    storeType: StoreType | null;
    stores: Map<string, Store<unknown>>;
};

const state: State = {
    initialized: false,
    storeType: null,
    stores: new Map(),
};

export namespace StoreManager {
    export function initialize(type: StoreType) {
        if (state.initialized) {
            return;
        }

        state.storeType = type;

        for (const resource of builtinResources) {
            switch (resource) {
                case 'users':
                    state.stores.set('users', UserStoreFactory.getStore(type));
            }
        }

        state.initialized = true;
    }

    export function getStore<T = unknown>(resource: string): Store<T> {
        return state.stores.get(resource) as Store<T>;
    }

    export function getStoreType() {
        return state.storeType;
    }
}
