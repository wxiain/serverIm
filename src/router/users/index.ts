import { Router } from 'express';
import Home from '../../models/users';
import UserLogin from '../../models/users/login';
import getUserInfo from '../../models/users/getUserInfo';
import setUserInfo from '../../models/users/setUserInfo';
import UserRegister from '../../models/users/register';

import check from '../../middlewares/jwt/check';

const router = Router();

// router.get('/', Home);
router.post('/login', UserLogin); // 登录
// 默认获取当前登录用户信息, 传入userId, 则获取对应的消息
router.get('/info', check, getUserInfo);
// 注册, 如果参数带了isLogin: true, 则会返回token
router.post('/register', UserRegister);

router.put('/set', check, setUserInfo);

export default router;
