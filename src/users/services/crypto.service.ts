import config from 'config';
import bcrypt from 'bcrypt';

const saltRounds = config.get<number>('crypto.saltRounds');

export async function hashPwd(pwd: string): Promise<string> {
    return bcrypt.hash(pwd, saltRounds);
}

export async function checkPwd(pwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pwd, hash);
}
