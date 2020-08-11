import { Router } from 'express';
import Home from '../../models/users';
import UserLogin from '../../models/users/login';
import getUserInfo from '../../models/users/getUserInfo';

import check from '../../middlewares/jwt/check';

const router = Router();

// router.get('/', Home);
router.post('/login', UserLogin);
router.get('/info', check, getUserInfo);

export default router;
