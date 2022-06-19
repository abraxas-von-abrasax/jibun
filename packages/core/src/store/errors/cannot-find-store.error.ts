export class CannotFindStoreError extends Error {
    constructor(resource: string) {
        super(`Cannot find store for resource '${resource}'.`);
        Object.setPrototypeOf(this, CannotFindStoreError.prototype);
    }
}
