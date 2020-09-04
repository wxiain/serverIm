import { PoolConfig } from 'mysql';

const env = process.env;
export const mysqlConfig:PoolConfig = {
  host: env.DATA_HOST,
  port: Number(env.DATA_PORT),
  user: env.DATA_USER,
  password: env.DATA_PASSWORD,
  database: env.DATA_DATABASE,
  acquireTimeout: Number(env.DATA_ACQUIRE_TIMEOUT),
  connectionLimit: Number(env.DATA_CONNECTION_LIMIT),
  waitForConnections: Boolean(env.DATA_WAIT_FOR_CONNECTIONS),
  queueLimit: Number(env.DATA_QUEUE_LIMIT)
}