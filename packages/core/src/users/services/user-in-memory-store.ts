import { User, UserID } from '../models';
import { UserStore } from './user-store';

type UserMap = Map<UserID, User>;

export class UserInMemoryStore implements UserStore {
    private static instance: UserInMemoryStore;
    private _users: UserMap;

    private constructor() {
        this._users = new Map();
    }

    static getInstance() {
        if (!UserInMemoryStore.instance) {
            UserInMemoryStore.instance = new UserInMemoryStore();
        }
        return UserInMemoryStore.instance;
    }

    async get(id: UserID): Promise<User | null> {
        return this._users.get(id) ?? null;
    }

    async save(user: User): Promise<boolean> {
        if (!user.check()) {
            return false;
        }
        this._users.set(user.id, user);
        return true;
    }
}
