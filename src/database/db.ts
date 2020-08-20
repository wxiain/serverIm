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

export default (sql: string, total?: boolean) => {
  return new Promise((res, rej) => {
    pool.getConnection((err: MysqlError, connectionOptions: PoolConnection) => {
      if (err) return rej(err);
      sql = total ? sql.replace(/^SELECT/, 'SELECT SQL_CALC_FOUND_ROWS') : sql;
      connectionOptions.query(sql, (err: MysqlError, result: PoolConnection) => {
        if (err) {
          // 释放连接池
          pool.releaseConnection(connectionOptions);
          return rej(err);
        }
        if (total) {
          connectionOptions.query('SELECT FOUND_ROWS()', (err, data) => {
            pool.releaseConnection(connectionOptions);
            if (err) return rej(err);
            res({ data: result, total: data[0]['FOUND_ROWS()'] });
          });
        } else {
          res(result);
        }
      });
    });
  });
};
