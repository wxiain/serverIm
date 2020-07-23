import express, {Request, Response} from 'express';
const app = express();
app.get('/', (req:Request, res:Response) => {
  res.send('Hello word');
})
app.listen(process.env.PORT, () => {
  console.log(process.env.PORT + '服务启动成功');
})
