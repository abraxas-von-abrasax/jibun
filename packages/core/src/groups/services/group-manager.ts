import { PropertyKey } from '../../properties';
import { Store } from '../../store';
import { ROOT_GROUP_ID } from '../constants';
import { Group } from '../models';
import { GroupStoreFactory } from './group-store-factory';

const state: UninitializedState | InitializedState = {
    initialized: false,
    store: null,
    globalGroup: null,
};

export namespace GroupManager {
    export function initialize(): void {
        if (state.initialized) {
            return;
        }

        state.store = GroupStoreFactory.getStore();

        const rootGroup = new Group(ROOT_GROUP_ID);
        state.store.save(rootGroup);
        state.globalGroup = rootGroup;
        // TODO: Rework typing here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state as any).initialized = true;
    }

    export async function getGroup(groupID: string): Promise<Group | null> {
        if (!state.initialized) {
            return null;
        }
        const group = await state.store.get(groupID);
        return group ?? null;
    }

    export function getGlobalGroup(): Group {
        if (!state.initialized) {
            // TODO: Create custom error object.
            throw new Error('Jibun has not been initialized yet.');
        }
        return state.globalGroup;
    }

    export function setGlobalMandatoryProperties(
        properties: PropertyKey[]
    ): void {
        if (!state.initialized) {
            return;
        }

        for (const property of properties) {
            state.globalGroup.addMandatoryField(property);
        }
    }
}

type State = {
    initialized: boolean;
    store: Store<Group> | null;
    globalGroup: Group | null;
};

interface UninitializedState {
    initialized: false;
    store: Store<Group> | null;
    globalGroup: Group | null;
}

interface InitializedState extends State {
    initialized: true;
    store: Store<Group>;
    globalGroup: Group;
}
