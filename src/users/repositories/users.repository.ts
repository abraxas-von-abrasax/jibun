import sql from 'sql-template-strings';
import { query } from '../../storage';
import { User } from '../typings';

async function findByEmail(email: string): Promise<User | null> {
    const { rows: users } = await query(sql`
        select  id          as "id",
                created_at  as "createdAt",
                updated_at  as "updatedAt",
                email       as "email",
                pwd_hash    as "pwdHash"
        from    jibun_users
        where   email = ${email};
    `);
    return users?.[0] ?? null;
}

async function save(data: Partial<User>): Promise<User> {
    if (data.id) {
        const stored = await find(data.id);

        if (stored) {
            return update(data.id, data);
        }
    }

    if (!checkIntegrity) {
        throw new Error(`Invalid user object: ${data}`);
    }

    const { rows: saved } = await query(sql`
        insert into jibun_users (updated_at, email, pwd_hash)
        values      (${new Date().toISOString()}, ${data.email}, ${data.pwdHash})
        returning   id          as "id",
                    created_at  as "createdAt",
                    updated_at  as "updatedAt",
                    email       as "email",
                    pwd_hash    as "pwdHash";
    `);

    return saved?.[0]!;
}

export const UsersRepository = {
    findByEmail,
    save,
};

function checkIntegrity(data: Partial<User>): boolean {
    return !!data.email && !!data.pwdHash;
}

async function find(id: string): Promise<User | null> {
    const { rows: users } = await query(sql`
        select  id          as "id",
                created_at  as "created_at",
                updated_at  as "updated_at",
                email       as "email",
                pwdHash     as "pwdHash"
        from    jibun_users
        where   id = ${id};
    `);
    return users?.[0] ?? null;
}

async function update(id: string, data: Partial<User>): Promise<User> {
    const stored = await find(id);

    if (!stored) {
        throw new Error(`Cannot find user with ID '${id}'.`);
    }

    const updated = Object.assign({}, stored, data);

    const { rows: saved } = await query(sql`
        update          jibun_users
        set             updated_at = ${new Date().toISOString()},
                        email = ${updated.email},
                        pwd_hash = ${updated.pwdHash}
        where           id = ${id}
        on conflict     do nothing
        returning       id          as "id",
                        created_at  as "createdAt",
                        updated_at  as "updatedAt",
                        email       as "email",
                        pwd_hash    as "pwdHash";
    `);

    return saved;
}
