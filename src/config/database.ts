interface IDatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  debug: boolean;
}

export default {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  debug: process.env.NODE_ENV === 'development'
} as IDatabaseConfig;
