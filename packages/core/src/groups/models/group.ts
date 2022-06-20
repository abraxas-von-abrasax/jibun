import { PropertyKey } from '../../properties';
import { GroupCreateOptions, MandatoryFields } from '../types';

export class Group {
    private _identifier: string;
    private _mandatoryFields: MandatoryFields;
    private _extends: Group | null;

    constructor(identifier: string, options?: GroupCreateOptions) {
        this._identifier = identifier;
        this._mandatoryFields = new Set();

        if (options?.mandatoryFields?.length) {
            for (const field of options.mandatoryFields) {
                this._mandatoryFields.add(field);
            }
        }

        this._extends = options?.extendsGroup ?? null;
    }

    get identifier(): string {
        return this._identifier;
    }

    get mandatoryFields(): PropertyKey[] {
        return [...this._mandatoryFields];
    }

    addMandatoryField(field: string): void {
        this._mandatoryFields.add(field);
    }
}
