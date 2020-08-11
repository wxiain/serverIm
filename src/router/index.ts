import { Router } from 'express';

import user from './users';
import message from './message';
import friend from './friend';

const router = Router();

router.use('/user', user);
router.use('/message', message);
router.use('/friend', friend);

export default router;
