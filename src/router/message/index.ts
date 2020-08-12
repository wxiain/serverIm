import { Router } from 'express';
import check from '../../middlewares/jwt/check';
import Message from '../../models/message';
import links from '../../models/message/links';
import messages from '../../models/message/messages';

const router = Router();

router.get('/home', Message);
router.get('/links', check, links); // 好友聊天列表(发送过消息)
router.get('/messages', check, messages); // 聊天消息列表

export default router;
