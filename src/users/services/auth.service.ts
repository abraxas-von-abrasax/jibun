import { UsersRepository } from '../repositories/users.repository';
import { User } from '../typings';
import { hashPwd } from './crypto.service';

async function register(email: string, pwd: string): Promise<User> {
    const stored = await UsersRepository.findByEmail(email);

    if (stored) {
        throw new Error('User is already existing.');
    }

    const user = {
        email,
        pwdHash: await hashPwd(pwd),
    };

    return UsersRepository.save(user);
}

export const AuthService = {
    register,
};
