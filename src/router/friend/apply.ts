import { Router } from 'express';

import check from '../../middlewares/jwt/check';
import apply from '../../models/friend/apply';
import applyList from '../../models/friend/appList';

const router = Router();

router.post('/', check, apply); // 申请添加好友
router.get('/list', check, applyList); // 申请添加好友列表

export default router;
