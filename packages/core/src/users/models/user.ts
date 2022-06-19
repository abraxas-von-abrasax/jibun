import * as crypto from 'crypto';
import { PropertyKey, PropertyMap, PropertyValue } from './property';

export type UserID = string;

export class User {
    private readonly _id: UserID;
    private readonly _properties: PropertyMap;

    constructor() {
        this._id = crypto.randomUUID();
        this._properties = new Map();
    }

    get id(): UserID {
        return this._id;
    }

    setProperty(key: PropertyKey, value: PropertyValue): void {
        this._properties.set(key, value);
    }

    get properties(): PropertyMap {
        return this._properties;
    }
}
