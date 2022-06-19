export class ResourceNotRegisteredError extends Error {
    constructor(resource: string) {
        super(`Resource '${resource}' is not registered.`);
        Object.setPrototypeOf(this, ResourceNotRegisteredError.prototype);
    }
}
