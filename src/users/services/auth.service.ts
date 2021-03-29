import { UsersRepository } from '../repositories';
import { User, UserDto } from '../typings';
import { hashPwd } from './crypto.service';
import { createJwt, verifyJwt } from './jwt.service';

export namespace AuthService {
    export async function register(email: string, pwd: string): Promise<string> {
        const stored = await UsersRepository.findByEmail(email);

        if (stored) {
            throw new Error('User is already existing.');
        }

        const data = {
            email,
            pwdHash: await hashPwd(pwd),
        };

        const user = await UsersRepository
            .save(data)
            .then(u => createDto(u));

        return createJwt<UserDto>(user);
    }

    export function signIn(jwt: string): UserDto {
        return verifyJwt<UserDto>(jwt);
    }
}

function createDto(user: User): UserDto {
    return {
        id: user.id,
        email: user.email,
    };
}
