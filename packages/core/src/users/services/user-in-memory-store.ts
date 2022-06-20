import { Store } from '../../store';
import { IDTools } from '../../utils';
import { User } from '../models';

type UserMap = Map<IDTools.ID, User>;

export class UserInMemoryStore implements Store<User> {
    private static _instance: UserInMemoryStore;
    private _users: UserMap;

    private constructor() {
        this._users = new Map();
    }

    static getInstance() {
        if (!UserInMemoryStore._instance) {
            UserInMemoryStore._instance = new UserInMemoryStore();
        }
        return UserInMemoryStore._instance;
    }

    async get(id: IDTools.ID): Promise<User | null> {
        return this._users.get(id) ?? null;
    }

    async save(user: User): Promise<void> {
        // TODO: check if user is valid before storing
        this._users.set(user.id, user);
    }
}
