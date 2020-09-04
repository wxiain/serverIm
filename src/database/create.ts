import users from './schema/users';

import createMysql from './createMysql';

let tables = [users];

function create(item: {name: string, field: object, comment: string}):string {
  let sql:string = 'CREATE TABLE IF NOT EXISTS ' + item.name + ' (';
  for (let [field, val] of Object.entries(item.field)) {
    sql += field + ' ' + val +',';
  }
  sql = sql.substr(0, sql.length - 1);
  sql += ") COMMENT " + "'" + item.comment + "'"
  return sql;
}

for (let item of tables) {
  let sql = create(item);
  createMysql.connect((err => {
    if (err) throw err;
    createMysql.query(sql, (err, result:any) => {
      if (err) throw err;
      console.log(item.name + ' 创建成功');
    })
  }))
}