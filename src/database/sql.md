# SQL

### 查

- 简单的对象查询

```sql
SELECT * FROM friends WHERE relations->'$.id'='2'
```

- api JSON_CONTAINS查询

```sql
SELECT * FROM friends WHERE JSON_CONTAINS(relations->'$.id', '"2"') 
```

- 查询数组值

```sql
SELECT array FROM friends WHERE JSON_CONTAINS(array, JSON_OBJECT('avatar', "null")) 
```

- 模糊查询, 左右模糊

```sql
SElECT name,id,avatar,nickname FROM users WHERE name LIKE '%册%'
```

- 模糊查询且和数组配合使用

```sql
SELECT * FROM users,friends WHERE name Like '%册%' AND JSON_CONTAINS(friends.array->'$[*].id','"2"')
前面有几条, 或者后面有几个满足条件, 则会以最多的结果作为数组长度返回
```

- 分页

```sql
SELECT * FROM proposers WHERE apply_id=2 ORDER BY id LIMIT 0,10 (pageNo=0, pageSize)
```


### 改

- 改为数组

```sql
UPDATE 
	friends 
SET 
	array='[{"id":"2","name":"注册0","avatar":"null"},{"id":"3","name":"注册2","avatar":"null"}]' WHERE 
	user_id = 1
```

### 增

- 添加json

```sql
INSERT INTO friends (user_id,relations) VALUES (1, '{"id":"2","name":"注册1","avatar":"null"}')
```

### 删
```sql
DELETE FROM proposers WHERE id=1
```

### 增改

- 有是修改, 没有是增加
- 不要让id为主键, 但是需要自增, 可以显式的设置id为`unique`类型, 就可以使id自增了
- Navicat下的设计表, 索引哪儿

```sql
INSERT INTO `table` (user_id,send_id,name) VALUES (1,2,'22') ON DUPLICATE KEY UPDATE name='77'
```