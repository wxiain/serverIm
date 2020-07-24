import mysql, { PoolConfig, MysqlError, PoolConnection } from 'mysql';
const config = process.env;
const mysqlConfig: PoolConfig = {
  host: config.DATA_HOST,
  port: Number(config.DATA_PORT),
  user: config.DATA_USER,
  password: config.DATA_PASSWORD,
  database: config.DATA_DATABASE,
  acquireTimeout: Number(config.DATA_ACQUIRE_TIMEOUT),
  connectionLimit: Number(config.DATA_CONNECTION_LIMIT),
  waitForConnections: Boolean(config.DATA_WAIT_FOR_CONNECTIONS),
  queueLimit: Number(config.DATA_QUEUE_LIMIT)
};

const pool = mysql.createPool(mysqlConfig);

export default (sql: string) => {
  return new Promise((res, rej) => {
    pool.getConnection((err: MysqlError, connectionOptions: PoolConnection) => {
      if (err) return rej(err);
      connectionOptions.query(sql, (err: MysqlError, result: PoolConnection) => {
        // 释放连接池
        pool.releaseConnection(connectionOptions);
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  });
};
