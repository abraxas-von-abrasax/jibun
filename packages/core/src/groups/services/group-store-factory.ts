import { Store } from '../../store';
import { Group } from '../models';
import { GroupInMemoryStore } from './group-in-memory.store';

export class GroupStoreFactory {
    static getStore(): Store<Group> {
        return GroupInMemoryStore.getInstance();
    }
}
