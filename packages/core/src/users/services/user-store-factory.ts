import { UserInMemoryStore } from './user-in-memory-store';
import { UserStore } from './user-store';

export class UserStoreFactory {
    static getStore(): UserStore {
        return UserInMemoryStore.getInstance();
    }
}
