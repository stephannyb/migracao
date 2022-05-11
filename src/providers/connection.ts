import 'dotenv/config';
import 'reflect-metadata';
import knex from 'knex';

const MySqlknexConnection = knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  pool: {
    min: 2,
    max: 10
  },
  debug: false
});

export { MySqlknexConnection };
