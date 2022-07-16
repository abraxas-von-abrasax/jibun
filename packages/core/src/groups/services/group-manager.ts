import { PropertyKey } from '../../properties';
import { StoreManager } from '../../store';
import { ROOT_GROUP_ID } from '../constants';
import { Group } from '../models';
import { GroupCreateOptions } from '../types';

const state: UninitializedState | InitializedState = {
    initialized: false,
    globalGroup: null,
};

export namespace GroupManager {
    export async function initialize(): Promise<void> {
        if (state.initialized) {
            return;
        }

        const store = StoreManager.getStore<Group>('groups');

        const rootGroup = new Group(ROOT_GROUP_ID);
        await store.save(rootGroup);
        state.globalGroup = rootGroup;
        // TODO: Rework typing here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state as any).initialized = true;
    }

    export async function getGroup(id: string): Promise<Group | null> {
        if (!state.initialized) {
            return null;
        }

        const store = StoreManager.getStore<Group>('groups');
        const group = await store.get(id);
        return group ?? null;
    }

    export function getGlobalGroup(): Group {
        if (!state.initialized) {
            // TODO: Create custom error object.
            throw new Error('Jibun has not been initialized yet.');
        }
        return state.globalGroup;
    }

    export function setGlobalMandatoryProperties(properties: PropertyKey[]): void {
        if (!state.initialized) {
            return;
        }

        for (const property of properties) {
            state.globalGroup.addMandatoryField(property);
        }
    }

    export async function createGroup(id: string, options?: GroupCreateOptions): Promise<Group> {
        const existing = await getGroup(id);

        if (existing) {
            return existing;
        }

        if (!state.initialized) {
            throw new Error('The groups store has not been initialized.');
        }

        const store = StoreManager.getStore<Group>('groups');

        const newGroup = new Group(id, options);
        await store.save(newGroup);

        return newGroup;
    }
}

type State = {
    initialized: boolean;
    globalGroup: Group | null;
};

interface UninitializedState {
    initialized: false;
    globalGroup: Group | null;
}

interface InitializedState extends State {
    initialized: true;
    globalGroup: Group;
}
