import crypto from 'crypto';

export namespace IDTools {
    export type ID = string;

    export function generateID(): ID {
        return crypto.randomUUID();
    }
}
