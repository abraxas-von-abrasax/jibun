import { PropertyMap, MandatoryPropertySet, PropertyKey, PropertyValue } from './property';
import * as crypto from 'crypto';

export type UserID = string;

export class User {
    private readonly _id: UserID;
    private readonly _mandatoryProperties: MandatoryPropertySet;
    private readonly _properties: PropertyMap;

    constructor(mandatoryProperties?: PropertyKey[]) {
        this._id = crypto.randomUUID();
        this._mandatoryProperties = new Set();
        this._properties = new Map();

        if (mandatoryProperties) {
            mandatoryProperties.forEach(property => this._mandatoryProperties.add(property));
        }
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

    check(): boolean {
        for (const propKey of this._mandatoryProperties) {
            if (!this._properties.has(propKey)) {
                return false;
            }
        }
        return true;
    }
}
