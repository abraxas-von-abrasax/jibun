import { Group, GroupManager } from '../../groups';
import { PropertyKey, PropertyMap, PropertyValue } from '../../properties';
import { IDTools } from '../../utils';
import { CannotAddUserToGroupError } from '../errors';
import { UserManager } from '../services';
import { UserStore } from '../types';

export class User {
    private static _store: UserStore;

    private readonly _id: IDTools.ID;
    private readonly _properties: PropertyMap;
    private _group: Group;

    constructor(group?: Group) {
        this._id = IDTools.generateID();
        this._properties = new Map();
        this._group = group ?? GroupManager.getGlobalGroup();
    }

    get id(): IDTools.ID {
        return this._id;
    }

    setProperty(key: PropertyKey, value: PropertyValue): void {
        this._properties.set(key, value);
    }

    get properties(): PropertyMap {
        return this._properties;
    }

    get group(): string | null {
        return this._group?.identifier ?? null;
    }

    get mandatoryFields(): string[] {
        if (!this._group) {
            return [];
        }
        return this._group.mandatoryFields;
    }

    check(): boolean {
        for (const field of this.mandatoryFields) {
            if (!this._properties.has(field)) {
                return false;
            }
        }
        return true;
    }

    async addToGroup(groupID: string): Promise<void> {
        const group = await GroupManager.getGroup(groupID);

        if (!group) {
            throw new CannotAddUserToGroupError(groupID, 'group not found');
        }

        this._group = group;
    }

    async save(): Promise<User> {
        await User._getStore().save(this);
        return this;
    }

    static async get(id: string): Promise<User | null> {
        return User._getStore().get(id);
    }

    private static _getStore(): UserStore {
        if (!User._store) {
            User._store = UserManager.getStore();
        }
        return User._store;
    }
}
