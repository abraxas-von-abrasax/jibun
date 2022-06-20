import { Store } from '../../store';
import { Group } from '../models';

type GroupMap = Map<string, Group>;

export class GroupInMemoryStore implements Store<Group> {
    private static _instance: GroupInMemoryStore;
    private _groups: GroupMap;

    private constructor() {
        this._groups = new Map();
    }

    static getInstance(): GroupInMemoryStore {
        if (!GroupInMemoryStore._instance) {
            GroupInMemoryStore._instance = new GroupInMemoryStore();
        }
        return GroupInMemoryStore._instance;
    }

    async get(id: string): Promise<Group | null> {
        return this._groups.get(id) ?? null;
    }
    async save(group: Group): Promise<void> {
        this._groups.set(group.identifier, group);
    }
}
