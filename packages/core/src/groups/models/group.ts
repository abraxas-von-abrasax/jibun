import { PropertyKey } from '../../properties';
import { GroupCreateOptions, MandatoryFields } from '../types';
import { GroupManager } from '../services';
import { ROOT_GROUP_ID } from '../constants';

export class Group {
    private readonly _identifier: string;
    private readonly _mandatoryFields: MandatoryFields;
    private _extends: Group | null;

    constructor(identifier: string, options?: GroupCreateOptions) {
        this._identifier = identifier;
        this._mandatoryFields = new Set();

        if (options?.mandatoryFields?.length) {
            for (const field of options.mandatoryFields) {
                this._mandatoryFields.add(field);
            }
        }

        const globalGroup = identifier !== ROOT_GROUP_ID
            ? GroupManager.getGlobalGroup()
            : null;

            this._extends = options?.extendsGroup ?? globalGroup;
    }

    get identifier(): string {
        return this._identifier;
    }

    get mandatoryFields(): PropertyKey[] {
        const parentMandatoryFields = this._extends?.mandatoryFields ?? [];
        return [...parentMandatoryFields, ...this._mandatoryFields];
    }

    addMandatoryField(field: string): void {
        this._mandatoryFields.add(field);
    }
}
