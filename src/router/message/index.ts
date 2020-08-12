import { Router } from 'express';
import Message from '../../models/message';
import links from '../../models/message/links';
import check from '../../middlewares/jwt/check';

const router = Router();

router.get('/home', Message);
router.get('/links', check, links); // 聊天列表

export default router;
