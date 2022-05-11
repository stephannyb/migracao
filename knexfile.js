/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// Update with your config settings.
require('dotenv').config();
const path = require('path');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
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
      tableName: 'knex_migrations',
      directory: path.resolve(
        __dirname,
        'dist',
        'database',
        'knex',
        'migrations'
      )
    }
  }
};
