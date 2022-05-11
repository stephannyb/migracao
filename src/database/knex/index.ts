import 'dotenv/config';
import 'reflect-metadata';
import knex from 'knex';
import database from '../../config/database';

const knexConnection = knex({
  client: 'postgresql',
  connection: database,
  pool: {
    min: 2,
    max: 10
  },
  debug: database.debug
});

export { knexConnection };
