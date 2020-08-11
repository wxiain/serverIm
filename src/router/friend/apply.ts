import { Router } from 'express';

import apply from '../../models/friend/apply';
import check from '../../middlewares/jwt/check';

const router = Router();

router.post('/', check, apply);

export default router;
