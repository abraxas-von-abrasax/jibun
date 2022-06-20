export class CannotAddUserToGroupError extends Error {
    constructor(groupID: string, reason?: string) {
        let message = `Cannot add user to group '${groupID}'`;

        if (reason) {
            message += ` :: reason: ${reason}`;
        }

        super(message);
        Object.setPrototypeOf(this, CannotAddUserToGroupError.prototype);
    }
}
