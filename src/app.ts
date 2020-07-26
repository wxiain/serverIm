import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
// parse application/x-www-form-urlencoded, extended: false表示为字符串和数组, true表示任意类型
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT + '服务启动成功');
});
