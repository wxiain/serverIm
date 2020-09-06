import users from './schema/users';
import links from './schema/links';
import messages from './schema/messages';
import proposers from './schema/proposers';
import friends from './schema/friends';

import createMysql from './createMysql';

let tables = [users, links, messages, proposers, friends];
let spaces = ['KEY', 'PRIMARY KEY'];

function getSpaces(key: string): string {
  return spaces.includes(key) ? '' : ' ';
}

function create(item: { name: string; field: object; comment: string }): string {
  let sql: string = 'CREATE TABLE IF NOT EXISTS ' + item.name + ' (';
  for (let [field, val] of Object.entries(item.field)) {
    sql += field + getSpaces(field) + val + ',';
  }
  sql = sql.substr(0, sql.length - 1);
  sql += ') COMMENT ' + "'" + item.comment + "'";
  return sql;
}

createMysql.connect((err) => {
  if (err) throw err;
  tables.forEach((item, index) => {
    setTimeout(() => {
      let sql = create(item);
      createMysql.query(sql, (err, result: any) => {
        if (err) throw err;
        console.log(item.name + ' 创建成功', `${index + 1}/${tables.length}`);
      });
    }, index * 1500);
  });
});
