import { UserStore } from '../types';
import { StoreManager } from '../../store';
import { User } from '../models';

export namespace UserManager {
    export function getStore(): UserStore {
        return StoreManager.getStore<User>('users');
    }
}
