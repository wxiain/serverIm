import { Router } from 'express';
import Home from '../../models/users';
import UserLogin from '../../models/users/login';
import getUserInfo from '../../models/users/getUserInfo';

import check from '../../middlewares/jwt/check';

const router = Router();

// router.get('/', Home);
router.post('/login', UserLogin); // 登录
router.get('/info', check, getUserInfo); // 获取当前登录用户信息

export default router;
