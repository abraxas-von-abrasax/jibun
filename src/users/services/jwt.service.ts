import { sign, verify } from 'jsonwebtoken';
import config from 'config';

export function createJwt<T extends object>(data: T, expiresIn: number | string): string {
    return sign(data, config.get('crypto.jwtSecret'), { expiresIn });
}

export function verifyJwt<T extends object>(token: string): T {
    return cleanJwt<T>(verify(token, config.get('crypto.jwtSecret')) as T);
}

function cleanJwt<T extends object>(token: T): T {
    const cleanToken: any = { ...token };
    delete cleanToken.iss;
    delete cleanToken.sub;
    delete cleanToken.aud;
    delete cleanToken.exp;
    delete cleanToken.nbf;
    delete cleanToken.iat;
    delete cleanToken.jti;
    return cleanToken as T;
}
