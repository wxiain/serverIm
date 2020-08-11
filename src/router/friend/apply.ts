import { Router } from 'express';

import check from '../../middlewares/jwt/check';
import apply from '../../models/friend/apply';
import applyList from '../../models/friend/appList';

const router = Router();

router.post('/', check, apply);
router.get('/list', check, applyList);

export default router;
