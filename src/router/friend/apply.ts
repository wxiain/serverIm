import { Router } from 'express';

import check from '../../middlewares/jwt/check';
import apply from '../../models/friend/apply';
import applyList from '../../models/friend/appList';
import agree from '../../models/friend/agree';

const router = Router();

router.post('/', check, apply); // 申请添加好友
router.get('/list', check, applyList); // 申请添加好友列表
router.put('/agree/:id', check, agree); // 同意好友申请

export default router;
