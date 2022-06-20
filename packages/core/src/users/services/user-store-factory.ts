import { Store } from '../../store';
import { User } from '../models';
import { UserInMemoryStore } from './user-in-memory-store';

export class UserStoreFactory {
    static getStore(): Store<User> {
        return UserInMemoryStore.getInstance();
    }
}
