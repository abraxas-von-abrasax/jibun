import { sign, verify } from 'jsonwebtoken';
import config from 'config';
import * as fs from 'fs';
import * as path from 'path';

const keyPath = path.resolve(process.cwd(), config.get('crypto.jwtKey'));
const keyPubPath = path.resolve(process.cwd(), config.get('crypto.jwtPubKey'));

const [privateKey, publicKey] = [fs.readFileSync(keyPath, 'utf8'), fs.readFileSync(keyPubPath, 'utf8')];

export function createJwt<T extends object>(data: T, expiresIn: number | string): string {
    return sign(data, privateKey, { expiresIn, algorithm: 'RS256' });
}

export function verifyJwt<T extends object>(token: any): T {
    return cleanJwt<T>(verify(token, publicKey));
}

function cleanJwt<T extends object>(token: any): T {
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
