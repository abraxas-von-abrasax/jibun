exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`create extension if not exists "uuid-ossp";`);
    pgm.sql(`create extension if not exists citext;`);
    pgm.sql(`
		create table if not exists jibun_users (
			id			uuid not null default uuid_generate_v4(),
			created_at	timestamptz not null default now(),
			updated_at	timestamptz not null default now(),
			email		citext unique not null,
			pwd_hash	varchar(255) not null,
			constraint	pk_jibun_users
						primary key (id)
		);
	`);
};

exports.down = pgm => {
    pgm.sql(`drop table if exists jibun_users;`);
    pgm.sql(`drop extension if exists citext;`);
    pgm.sql(`drop extension if exists "uuid-ossp";`);
};
