import { UsersRepository } from '../repositories';
import { IdentityToken, User, UserDto } from '../typings';
import { hashPwd } from './crypto.service';
import { createJwt, verifyJwt } from './jwt.service';

export namespace AuthService {
    export async function register(email: string, pwd: string): Promise<IdentityToken> {
        const stored = await UsersRepository.findByEmail(email);

        if (stored) {
            throw new Error('User is already existing.');
        }

        const data = {
            email,
            pwdHash: await hashPwd(pwd),
        };

        const user = await UsersRepository.save(data);

        return createTokens(user);
    }

    export function signIn(jwt: string): UserDto {
        return verifyJwt<UserDto>(jwt);
    }
}

function createTokens(user: User): IdentityToken {
    const dto = createDto(user);
    return {
        accessToken: createAccessToken(dto),
        refreshToken: createRefreshToken(dto),
    };
}

function createAccessToken(userDto: UserDto): string {
    return createJwt<UserDto>(userDto, '10m');
}

function createRefreshToken(userDto: UserDto): string {
    const inTwoMonths = '60 days';
    return createJwt<UserDto>(userDto, inTwoMonths);
}

function createDto(user: User): UserDto {
    return {
        id: user.id,
        email: user.email,
    };
}
