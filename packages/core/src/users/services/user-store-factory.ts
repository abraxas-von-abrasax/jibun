import { StoreType } from '../../store/types/store-type';
import { UserInMemoryStore } from './user-in-memory-store';
import { UserStore } from './user-store';

export class UserStoreFactory {
    static getStore(type: StoreType): UserStore {
        switch (type) {
            case StoreType.IN_MEMORY:
            default:
                return UserInMemoryStore.getInstance();
        }
    }
}
