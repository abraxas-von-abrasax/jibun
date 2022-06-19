import { User, UserID } from '../models';

export interface UserStore {
    get(id: UserID): Promise<User | null>;
    save(user: User): Promise<boolean>;
}
