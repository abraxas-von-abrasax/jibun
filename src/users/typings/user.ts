export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    pwdHash: string;
}

export type UserDto = {
    id: string;
    email: string;
}
