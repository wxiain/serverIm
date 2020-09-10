import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import { Server } from 'http';
import Socket from './models/sokcet';

const app = express();
// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next();
});
// parse application/x-www-form-urlencoded, extended: false表示为字符串和数组, true表示任意类型
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use('/im', router);

let server: Server = app.listen(process.env.PORT, () => {
  console.log(process.env.PORT + '服务启动成功');
});

new Socket(server);
