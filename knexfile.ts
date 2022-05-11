import type { Knex } from 'knex';
// import path from 'path';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    debug: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

module.exports = config;
